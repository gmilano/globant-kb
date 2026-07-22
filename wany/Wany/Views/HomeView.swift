import SwiftUI
import SwiftData

struct HomeView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \Entry.recordedAt, order: .reverse) private var entries: [Entry]
    @Query(sort: \WeeklySummary.generatedAt, order: .reverse) private var summaries: [WeeklySummary]

    @State private var isRecording = false
    @State private var showSundaySummary = false
    @State private var recordingSession = RecordingSession()

    private var todayEntries: [Entry] {
        let cal = Calendar.current
        return entries.filter { cal.isDateInToday($0.recordedAt) }
    }

    private var recentEntries: [Entry] {
        Array(entries.prefix(5))
    }

    private var currentWeekSummary: WeeklySummary? {
        let key = Entry.weekKey(for: .now)
        return summaries.first { $0.weekKey == key }
    }

    private var isSunday: Bool {
        Calendar.current.component(.weekday, from: .now) == 1
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    if isSunday, let summary = currentWeekSummary {
                        SundaySummaryBanner(summary: summary)
                    } else {
                        WeekStripView()
                    }

                    RecordButtonView(session: recordingSession) { finished in
                        saveEntry(finished)
                    }

                    if !recentEntries.isEmpty {
                        VStack(alignment: .leading, spacing: 12) {
                            Text("Recientes")
                                .font(.footnote)
                                .foregroundStyle(.secondary)
                                .padding(.horizontal)

                            ForEach(recentEntries) { entry in
                                NavigationLink(destination: EntryDetailView(entry: entry)) {
                                    EntryCardView(entry: entry)
                                }
                                .buttonStyle(.plain)
                            }
                        }
                    }
                }
                .padding()
            }
            .navigationTitle("Wany")
            .navigationBarTitleDisplayMode(.large)
        }
    }

    private func saveEntry(_ finished: FinishedEntry) {
        let entry = Entry(
            transcript: finished.transcript,
            duration: finished.duration,
            audioFilename: finished.audioFilename
        )
        modelContext.insert(entry)
        try? modelContext.save()

        Task.detached(priority: .background) {
            await ObservationJob(modelContext: modelContext).run(for: entry)

            let all = (try? modelContext.fetch(FetchDescriptor<Entry>())) ?? []
            if all.count % 5 == 0 {
                let existing = (try? modelContext.fetch(FetchDescriptor<DetectedLoop>())) ?? []
                await LoopDetectionJob(modelContext: modelContext).run(entries: all, existingLoops: existing)
            }
        }
    }
}
