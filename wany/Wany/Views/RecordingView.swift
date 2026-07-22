import SwiftUI

struct RecordButtonView: View {
    var session: RecordingSession
    var onFinished: (FinishedEntry) -> Void

    @State private var phase: Phase = .idle

    enum Phase { case idle, recording }

    var body: some View {
        VStack(spacing: 32) {
            if case .recording = phase {
                ScrollView {
                    Text(session.liveTranscript.isEmpty ? "Escuchando…" : session.liveTranscript)
                        .font(.body)
                        .foregroundStyle(session.liveTranscript.isEmpty ? .tertiary : .primary)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding()
                        .animation(.easeInOut, value: session.liveTranscript)
                }
                .frame(height: 120)
                .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 16))
            }

            Button {
                handleTap()
            } label: {
                ZStack {
                    Circle()
                        .fill(.tint)
                        .frame(width: 88, height: 88)
                        .scaleEffect(phase == .recording ? 1.0 + Double(session.amplitude) * 0.4 : 1.0)
                        .animation(.easeInOut(duration: 0.1), value: session.amplitude)

                    Image(systemName: phase == .recording ? "stop.fill" : "mic.fill")
                        .font(.system(size: 32, weight: .semibold))
                        .foregroundStyle(.white)
                }
            }
            .buttonStyle(.plain)

            if case .recording = phase {
                Text("Toca para terminar")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
    }

    private func handleTap() {
        switch phase {
        case .idle:
            phase = .recording
            Task {
                try? await session.startRecording()
            }
        case .recording:
            phase = .idle
            Task {
                if let finished = await session.stopRecording() {
                    onFinished(finished)
                }
            }
        }
    }
}
