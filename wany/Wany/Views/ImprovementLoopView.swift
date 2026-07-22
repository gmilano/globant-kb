import SwiftUI
import SwiftData

// Full screen for a loop the user wants to improve
struct ImprovementLoopView: View {
    let loop: DetectedLoop
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \Entry.recordedAt, order: .reverse) private var allEntries: [Entry]

    @State private var isRecordingIntent = false
    @State private var intentSession = RecordingSession()
    @State private var isGenerating = false

    private var latestSuggestion: LoopSuggestion? {
        loop.suggestions.sorted { $0.generatedAt > $1.generatedAt }.first
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 28) {

                // Loop header
                Label(loop.name, systemImage: loop.category.systemImage)
                    .font(.title2.bold())

                Divider()

                // Intent section
                VStack(alignment: .leading, spacing: 8) {
                    Text("Tu intención")
                        .font(.footnote)
                        .foregroundStyle(.secondary)

                    if let intent = loop.improvementIntent {
                        Text(""\(intent)"")
                            .font(.body)
                            .fontDesign(.serif)
                            .foregroundStyle(.primary)
                    }

                    Button {
                        isRecordingIntent = true
                    } label: {
                        Label(loop.improvementIntent == nil ? "Grabá tu intención" : "Actualizar intención", systemImage: "mic")
                            .font(.subheadline)
                    }
                    .buttonStyle(.bordered)
                }

                // Friction mapping — what the model found
                if let s = latestSuggestion, s.hasContent {
                    Divider()

                    VStack(alignment: .leading, spacing: 16) {
                        if let works = s.whatWorks {
                            SuggestionBlock(label: "Lo que funciona", text: works, icon: "checkmark.circle")
                        }
                        if let blocks = s.whatBlocks {
                            SuggestionBlock(label: "Lo que lo bloquea", text: blocks, icon: "xmark.circle")
                        }
                        if let window = s.window {
                            SuggestionBlock(label: "Una ventana esta semana", text: window, icon: "calendar.badge.clock")
                        }
                        if let collision = s.collision {
                            SuggestionBlock(
                                label: "Colisión con otro loop",
                                text: "Este loop compite con "\(collision)".",
                                icon: "arrow.trianglehead.2.clockwise.rotate.90"
                            )
                        }
                    }

                    Text("Basado en \(loop.mentionCount) entradas · \(s.generatedAt.formatted(.dateTime.month().day()))")
                        .font(.caption)
                        .foregroundStyle(.tertiary)
                }

                // Generate / regenerate button
                if loop.improvementIntent != nil {
                    Button {
                        generateSuggestion()
                    } label: {
                        if isGenerating {
                            ProgressView()
                                .frame(maxWidth: .infinity)
                        } else {
                            Text(latestSuggestion == nil ? "Analizar" : "Actualizar análisis")
                                .frame(maxWidth: .infinity)
                        }
                    }
                    .buttonStyle(.borderedProminent)
                    .disabled(isGenerating)
                }
            }
            .padding()
        }
        .navigationTitle(loop.name)
        .navigationBarTitleDisplayMode(.inline)
        .sheet(isPresented: $isRecordingIntent) {
            IntentRecordingSheet(session: intentSession) { finished in
                loop.improvementIntent = finished.transcript
                try? modelContext.save()
                isRecordingIntent = false
            }
        }
    }

    private func generateSuggestion() {
        isGenerating = true
        Task {
            await FrictionMappingJob(modelContext: modelContext).run(
                loop: loop,
                entries: Array(allEntries.prefix(30))
            )
            await MainActor.run { isGenerating = false }
        }
    }
}

struct SuggestionBlock: View {
    let label: String
    let text: String
    let icon: String

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Label(label, systemImage: icon)
                .font(.caption)
                .foregroundStyle(.secondary)
            Text(text)
                .font(.body)
        }
        .padding()
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 12))
    }
}

struct IntentRecordingSheet: View {
    var session: RecordingSession
    var onFinished: (FinishedEntry) -> Void

    var body: some View {
        NavigationStack {
            VStack(spacing: 32) {
                Text("¿Qué querés mejorar de este loop?")
                    .font(.headline)
                    .multilineTextAlignment(.center)

                RecordButtonView(session: session, onFinished: onFinished)
            }
            .padding()
            .navigationTitle("Tu intención")
            .navigationBarTitleDisplayMode(.inline)
        }
    }
}

// Passive loop detail (observer mode, no suggestions)
struct LoopDetailView: View {
    let loop: DetectedLoop
    @Environment(\.modelContext) private var modelContext

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                Label(loop.name, systemImage: loop.category.systemImage)
                    .font(.title2.bold())

                HStack(spacing: 16) {
                    StatChip(label: "Menciones", value: "\(loop.mentionCount)")
                    StatChip(label: "Estado", value: loop.status.label)
                    StatChip(label: "Momentum", value: loop.momentum.symbol)
                }

                if !loop.evidence.isEmpty {
                    Text(loop.evidence)
                        .font(.body)
                        .foregroundStyle(.secondary)
                }

                Divider()

                Text("Desde \(loop.firstDetectedAt.formatted(.dateTime.month(.wide).day().year()))")
                    .font(.caption)
                    .foregroundStyle(.tertiary)

                Button {
                    activateImprovement()
                } label: {
                    Label("Quiero mejorar este loop", systemImage: "arrow.up.circle")
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(.bordered)
            }
            .padding()
        }
        .navigationTitle(loop.name)
        .navigationBarTitleDisplayMode(.inline)
    }

    private func activateImprovement() {
        loop.isImprovement = true
        loop.improvementStartedAt = .now
        try? modelContext.save()
    }
}

struct StatChip: View {
    let label: String
    let value: String

    var body: some View {
        VStack(spacing: 2) {
            Text(value).font(.headline)
            Text(label).font(.caption2).foregroundStyle(.secondary)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 10))
    }
}
