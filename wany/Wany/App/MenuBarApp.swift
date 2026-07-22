import SwiftUI
import SwiftData

// macOS menu bar extra — record without opening the full window
#if os(macOS)
struct MenuBarView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \Entry.recordedAt, order: .reverse) private var entries: [Entry]
    @Query(sort: \DetectedLoop.lastMentionedAt, order: .reverse) private var loops: [DetectedLoop]

    @State private var session = RecordingSession()
    @State private var phase: RecordPhase = .idle
    @State private var openMainWindow = false

    enum RecordPhase { case idle, recording }

    private var lastEntry: Entry? { entries.first }
    private var activeLoopCount: Int { loops.filter { $0.status == .active }.count }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {

            // Record strip
            HStack {
                Button {
                    handleRecord()
                } label: {
                    HStack(spacing: 8) {
                        Circle()
                            .fill(phase == .recording ? Color.red : Color.accentColor)
                            .frame(width: 10, height: 10)
                            .scaleEffect(phase == .recording ? 1.0 + Double(session.amplitude) * 0.5 : 1.0)
                            .animation(.easeInOut(duration: 0.1), value: session.amplitude)

                        Text(phase == .recording ? "Grabando… toca para terminar" : "Nueva entrada")
                            .font(.subheadline.bold())
                    }
                }
                .buttonStyle(.plain)
                Spacer()
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 12)
            .background(Color.accentColor.opacity(0.08))

            Divider()

            // Live transcript while recording
            if phase == .recording, !session.liveTranscript.isEmpty {
                Text(session.liveTranscript)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineLimit(3)
                    .padding(.horizontal, 16)
                    .padding(.vertical, 8)
                    .frame(maxWidth: .infinity, alignment: .leading)

                Divider()
            }

            // Last entry preview
            if let entry = lastEntry {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Última entrada")
                        .font(.caption2)
                        .foregroundStyle(.tertiary)

                    Text(entry.transcript.split(separator: " ").prefix(15).joined(separator: " ") + "…")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .lineLimit(2)

                    Text(entry.recordedAt.formatted(.relative(presentation: .named)))
                        .font(.caption2)
                        .foregroundStyle(.tertiary)
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 10)

                Divider()
            }

            // Active loops summary
            if activeLoopCount > 0 {
                HStack {
                    Image(systemName: "arrow.trianglehead.2.clockwise")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Text("\(activeLoopCount) loop\(activeLoopCount == 1 ? "" : "s") activo\(activeLoopCount == 1 ? "" : "s")")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 8)

                Divider()
            }

            // Footer actions
            HStack {
                Button("Abrir Wany") {
                    NSApp.activate(ignoringOtherApps: true)
                    NSApp.windows.first { $0.title == "Wany" }?.makeKeyAndOrderFront(nil)
                }
                .buttonStyle(.plain)
                .font(.caption)

                Spacer()

                Button("Salir") { NSApp.terminate(nil) }
                    .buttonStyle(.plain)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 10)
        }
        .frame(width: 320)
    }

    private func handleRecord() {
        switch phase {
        case .idle:
            phase = .recording
            Task {
                try? await session.startRecording()
            }
        case .recording:
            phase = .idle
            Task {
                guard let finished = await session.stopRecording() else { return }
                let entry = Entry(
                    transcript: finished.transcript,
                    duration: finished.duration,
                    audioFilename: finished.audioFilename
                )
                modelContext.insert(entry)
                try? modelContext.save()

                Task.detached(priority: .background) {
                    await ObservationJob(modelContext: modelContext).run(for: entry)
                }
            }
        }
    }
}
#endif
