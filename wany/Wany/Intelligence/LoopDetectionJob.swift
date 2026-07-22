import Foundation
import FoundationModels
import SwiftData

struct LoopDetectionJob {
    let modelContext: ModelContext

    // Runs after every 5th new entry, and on first launch after 10+ entries
    func run(entries: [Entry], existingLoops: [DetectedLoop]) async {
        guard entries.count >= 3 else { return }

        let model = SystemLanguageModel.default
        guard case .available = model.availability else { return }

        let recentEntries = Array(entries.suffix(30)).map { entry in
            (date: entry.recordedAt.formatted(.dateTime.month().day().hour().minute()),
             transcript: entry.transcript)
        }

        do {
            let session = LanguageModelSession(instructions: Prompts.loopDetectorInstructions)
            let response = try await session.respond(to: Prompts.detectLoops(entries: recentEntries))
            let parsed = try parseLoopResponse(response.content, existing: existingLoops)

            await MainActor.run {
                for detected in parsed {
                    modelContext.insert(detected)
                }
                try? modelContext.save()
            }
        } catch {
            // Detection failed — silent, will retry next trigger
        }
    }

    private func parseLoopResponse(
        _ json: String,
        existing: [DetectedLoop]
    ) throws -> [DetectedLoop] {
        guard let data = json.data(using: .utf8),
              let root = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let loops = root["loops"] as? [[String: Any]]
        else { return [] }

        let existingNames = Set(existing.map { $0.name.lowercased() })

        return loops.compactMap { dict -> DetectedLoop? in
            guard
                let name = dict["name"] as? String,
                let categoryRaw = dict["category"] as? String,
                let statusRaw = dict["status"] as? String,
                let momentumRaw = dict["momentum"] as? String,
                let category = LoopCategory(rawValue: categoryRaw),
                let status = LoopStatus(rawValue: statusRaw),
                let momentum = LoopMomentum(rawValue: momentumRaw),
                !existingNames.contains(name.lowercased())
            else { return nil }

            let evidence = dict["evidence"] as? String ?? ""
            return DetectedLoop(name: name, category: category, status: status, momentum: momentum, evidence: evidence)
        }
    }
}
