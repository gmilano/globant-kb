import Foundation
import FoundationModels
import SwiftData

struct ObservationJob {
    let modelContext: ModelContext

    func run(for entry: Entry) async {
        let model = SystemLanguageModel.default
        guard case .available = model.availability else { return }

        do {
            let session = LanguageModelSession(instructions: Prompts.observerInstructions)
            let response = try await session.respond(to: Prompts.observeEntry(entry.transcript))
            let text = response.content.trimmingCharacters(in: .whitespacesAndNewlines)

            guard !text.isEmpty, text != "(nothing)" else { return }

            await MainActor.run {
                let obs = Observation(text: text)
                entry.observation = obs
                try? modelContext.save()
            }
        } catch {
            // Model unavailable or generation failed — stay silent
        }
    }
}
