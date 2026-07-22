import Foundation
import FoundationModels
import SwiftData

struct WeeklySummaryJob {
    let modelContext: ModelContext

    func run(weekKey: String, entries: [Entry], improvementLoops: [DetectedLoop]) async {
        guard entries.count >= 2 else { return }

        let model = SystemLanguageModel.default
        guard case .available = model.availability else { return }

        let formattedEntries = entries
            .sorted { $0.recordedAt < $1.recordedAt }
            .map { (date: $0.recordedAt.formatted(.dateTime.weekday(.wide).hour().minute()),
                    transcript: $0.transcript) }

        let activeLoopNames = improvementLoops
            .filter { $0.status == .active }
            .map { $0.name }

        do {
            // Generate narrative
            let narrativeSession = LanguageModelSession(instructions: Prompts.weeklyNarratorInstructions)
            let narrativeResponse = try await narrativeSession.respond(
                to: Prompts.weeklySummary(entries: formattedEntries, activeLoops: activeLoopNames)
            )
            let narrative = narrativeResponse.content.trimmingCharacters(in: .whitespacesAndNewlines)
            guard !narrative.isEmpty else { return }

            // Generate per-loop reports for improvement loops
            var loopReports: [String: String] = [:]
            for loop in improvementLoops where loop.isImprovement {
                let loopSession = LanguageModelSession(instructions: Prompts.loopNarratorInstructions)
                let loopResponse = try await loopSession.respond(
                    to: Prompts.loopWeekReport(loopName: loop.name, entries: formattedEntries)
                )
                let report = loopResponse.content.trimmingCharacters(in: .whitespacesAndNewlines)
                if !report.isEmpty {
                    loopReports[loop.name] = report
                }
            }

            let totalDuration = entries.reduce(0) { $0 + $1.duration }

            await MainActor.run {
                let summary = WeeklySummary(
                    weekKey: weekKey,
                    narrativeText: narrative,
                    entryCount: entries.count,
                    totalDuration: totalDuration,
                    loopReports: loopReports
                )
                modelContext.insert(summary)
                try? modelContext.save()
            }
        } catch {
            // Silent — no summary generated this week
        }
    }
}
