import Foundation
import SwiftData

// MARK: — Enums

enum LoopCategory: String, Codable, CaseIterable {
    case health, practice, movement, food, relationships, spiritual, mental, place

    var label: String {
        switch self {
        case .health:        return "Salud"
        case .practice:      return "Práctica"
        case .movement:      return "Movimiento"
        case .food:          return "Comida"
        case .relationships: return "Relaciones"
        case .spiritual:     return "Espiritual"
        case .mental:        return "Mental"
        case .place:         return "Lugar"
        }
    }

    var systemImage: String {
        switch self {
        case .health:        return "heart"
        case .practice:      return "leaf"
        case .movement:      return "figure.walk"
        case .food:          return "fork.knife"
        case .relationships: return "person.2"
        case .spiritual:     return "sparkles"
        case .mental:        return "brain.head.profile"
        case .place:         return "map"
        }
    }
}

enum LoopStatus: String, Codable {
    case active, shifting, dormant, broken

    var label: String {
        switch self {
        case .active:   return "Activo"
        case .shifting: return "En shift"
        case .dormant:  return "Dormido"
        case .broken:   return "Roto"
        }
    }
}

enum LoopMomentum: String, Codable {
    case growing, stable, cooling

    var symbol: String {
        switch self {
        case .growing: return "↗"
        case .stable:  return "→"
        case .cooling: return "↘"
        }
    }
}

// MARK: — Models

@Model final class DetectedLoop {
    var id: UUID
    var name: String
    var category: LoopCategory
    var firstDetectedAt: Date
    var lastMentionedAt: Date
    var mentionCount: Int
    var status: LoopStatus
    var momentum: LoopMomentum
    var evidence: String

    // Improvement loop fields — nil means passive (observer only)
    var isImprovement: Bool
    var improvementIntent: String?      // user's voice transcript of their intent
    var improvementStartedAt: Date?
    var suggestions: [LoopSuggestion]

    // Collision tracking
    var collidesWithLoopNamed: String?

    init(
        name: String,
        category: LoopCategory,
        status: LoopStatus = .active,
        momentum: LoopMomentum = .stable,
        evidence: String = ""
    ) {
        self.id = UUID()
        self.name = name
        self.category = category
        self.firstDetectedAt = .now
        self.lastMentionedAt = .now
        self.mentionCount = 1
        self.status = status
        self.momentum = momentum
        self.evidence = evidence
        self.isImprovement = false
        self.suggestions = []
    }

    var daysSinceLastMention: Int {
        Calendar.current.dateComponents([.day], from: lastMentionedAt, to: .now).day ?? 0
    }
}

@Model final class LoopSuggestion {
    var id: UUID
    var generatedAt: Date
    var whatWorks: String?
    var whatBlocks: String?
    var window: String?
    var collision: String?
    var acknowledged: Bool

    init(whatWorks: String?, whatBlocks: String?, window: String?, collision: String?) {
        self.id = UUID()
        self.generatedAt = .now
        self.whatWorks = whatWorks
        self.whatBlocks = whatBlocks
        self.window = window
        self.collision = collision
        self.acknowledged = false
    }

    var hasContent: Bool {
        whatWorks != nil || whatBlocks != nil || window != nil
    }
}

@Model final class WeeklySummary {
    var weekKey: String
    var generatedAt: Date
    var narrativeText: String
    var entryCount: Int
    var totalDuration: TimeInterval
    var loopReports: [String: String]   // loopName → one-paragraph report

    init(
        weekKey: String,
        narrativeText: String,
        entryCount: Int,
        totalDuration: TimeInterval,
        loopReports: [String: String] = [:]
    ) {
        self.weekKey = weekKey
        self.generatedAt = .now
        self.narrativeText = narrativeText
        self.entryCount = entryCount
        self.totalDuration = totalDuration
        self.loopReports = loopReports
    }
}
