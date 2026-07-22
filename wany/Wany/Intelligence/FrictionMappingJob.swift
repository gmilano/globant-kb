import Foundation
import FoundationModels
import SwiftData

struct FrictionMappingJob {
    let modelContext: ModelContext

    // Called when user activates an Improvement Loop
    func run(loop: DetectedLoop, entries: [Entry]) async {
        guard loop.isImprovement, let intent = loop.improvementIntent else { return }

        let model = SystemLanguageModel.default
        guard case .available = model.availability else { return }

        // Use entries where the loop was mentioned — fall back to last 20
        let relevantEntries = entries.suffix(20).map { entry in
            (date: entry.recordedAt.formatted(.dateTime.month().day()),
             transcript: entry.transcript)
        }

        guard !relevantEntries.isEmpty else { return }

        do {
            let session = LanguageModelSession(instructions: Prompts.frictionMapperInstructions)
            let prompt = Prompts.frictionMapping(
                loopName: loop.name,
                intent: intent,
                entries: Array(relevantEntries)
            )
            let response = try await session.respond(to: prompt)
            let suggestion = try parseSuggestion(response.content)

            guard suggestion.hasContent else { return }

            await MainActor.run {
                // Acknowledge previous unread suggestions before adding new one
                for old in loop.suggestions where !old.acknowledged {
                    old.acknowledged = true
                }
                loop.suggestions.append(suggestion)
                try? modelContext.save()
            }
        } catch {
            // Silent — user will see no suggestion
        }
    }

    private func parseSuggestion(_ json: String) throws -> LoopSuggestion {
        guard let data = json.data(using: .utf8),
              let dict = try? JSONSerialization.jsonObject(with: data) as? [String: Any]
        else {
            return LoopSuggestion(whatWorks: nil, whatBlocks: nil, window: nil, collision: nil)
        }

        func field(_ key: String) -> String? {
            let v = dict[key]
            if let s = v as? String, s != "null", !s.isEmpty { return s }
            return nil
        }

        return LoopSuggestion(
            whatWorks: field("what_works"),
            whatBlocks: field("what_blocks"),
            window: field("window"),
            collision: field("collision")
        )
    }
}
