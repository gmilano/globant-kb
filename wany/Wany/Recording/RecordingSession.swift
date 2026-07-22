import Foundation
import AVFoundation
import Speech

// On-device recording + real-time transcription via SpeechAnalyzer (iOS 26 / macOS 26)
@Observable @MainActor final class RecordingSession {

    enum State {
        case idle, recording, processing, failed(Error)
    }

    var state: State = .idle
    var liveTranscript: String = ""
    var amplitude: Float = 0

    private var audioEngine: AVAudioEngine?
    private var audioFile: AVAudioFile?
    private var currentFilename: String?
    private var startDate: Date?
    private var analyzer: SpeechAnalyzer?
    private var analyzerTask: Task<Void, Never>?

    func startRecording() async throws {
        guard case .idle = state else { return }

        let filename = "\(UUID().uuidString).m4a"
        let url = AudioFileStore.url(for: filename)

        try AVAudioSession.sharedInstance().setCategory(.record, mode: .default)
        try AVAudioSession.sharedInstance().setActive(true)

        let engine = AVAudioEngine()
        let format = engine.inputNode.outputFormat(forBus: 0)

        let settings: [String: Any] = [
            AVFormatIDKey: Int(kAudioFormatMPEG4AAC),
            AVSampleRateKey: format.sampleRate,
            AVNumberOfChannelsKey: format.channelCount,
            AVEncoderAudioQualityKey: AVAudioQuality.high.rawValue
        ]
        audioFile = try AVAudioFile(forWriting: url, settings: settings)

        engine.inputNode.installTap(onBus: 0, bufferSize: 1024, format: format) { [weak self] buffer, _ in
            try? self?.audioFile?.write(from: buffer)
            let level = buffer.rmsLevel
            Task { @MainActor [weak self] in
                self?.amplitude = level
            }
        }

        try engine.start()
        audioEngine = engine
        currentFilename = filename
        startDate = .now
        liveTranscript = ""
        state = .recording

        let speechAnalyzer = SpeechAnalyzer(locale: .current)
        analyzer = speechAnalyzer

        analyzerTask = Task { [weak self] in
            do {
                for try await result in speechAnalyzer.transcribe(audioEngine: engine) {
                    await MainActor.run {
                        self?.liveTranscript = result.bestTranscription
                    }
                }
            } catch {
                // SpeechAnalyzer ended — not necessarily an error
            }
        }
    }

    func stopRecording() async -> FinishedEntry? {
        guard case .recording = state else { return nil }
        state = .processing

        analyzerTask?.cancel()
        analyzer = nil

        audioEngine?.inputNode.removeTap(onBus: 0)
        audioEngine?.stop()
        audioEngine = nil

        try? AVAudioSession.sharedInstance().setActive(false)

        let transcript = liveTranscript
        let filename = currentFilename
        let duration = startDate.map { Date.now.timeIntervalSince($0) } ?? 0

        audioFile = nil
        currentFilename = nil
        startDate = nil
        state = .idle

        guard !transcript.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else {
            return nil
        }

        return FinishedEntry(transcript: transcript, duration: duration, audioFilename: filename)
    }
}

struct FinishedEntry {
    let transcript: String
    let duration: TimeInterval
    let audioFilename: String?
}

// MARK: — Audio helpers

private extension AVAudioPCMBuffer {
    var rmsLevel: Float {
        guard let data = floatChannelData?[0] else { return 0 }
        let count = Int(frameLength)
        let sum = (0..<count).reduce(Float(0)) { acc, i in acc + data[i] * data[i] }
        return sqrtf(sum / Float(count))
    }
}
