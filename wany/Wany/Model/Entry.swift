import Foundation
import SwiftData

@Model final class Entry {
    var id: UUID
    var recordedAt: Date
    var duration: TimeInterval
    var transcript: String
    var audioFilename: String?
    var weekKey: String
    var observation: Observation?

    init(transcript: String, duration: TimeInterval, audioFilename: String? = nil) {
        self.id = UUID()
        self.recordedAt = .now
        self.duration = duration
        self.transcript = transcript
        self.audioFilename = audioFilename
        self.weekKey = Entry.weekKey(for: .now)
    }

    static func weekKey(for date: Date) -> String {
        let cal = Calendar.current
        let week = cal.component(.weekOfYear, from: date)
        let year = cal.component(.yearForWeekOfYear, from: date)
        return "\(year)-W\(String(format: "%02d", week))"
    }
}

@Model final class Observation {
    var generatedAt: Date
    var text: String

    init(text: String) {
        self.generatedAt = .now
        self.text = text
    }
}
