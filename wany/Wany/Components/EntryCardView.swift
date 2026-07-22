import SwiftUI

struct EntryCardView: View {
    let entry: Entry

    private var preview: String {
        let words = entry.transcript.split(separator: " ").prefix(12).joined(separator: " ")
        return entry.transcript.count > words.count ? "\(words)…" : words
    }

    private var durationLabel: String {
        let s = Int(entry.duration)
        return s < 60 ? "\(s)s" : "\(s / 60):\(String(format: "%02d", s % 60))"
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack {
                Text(entry.recordedAt.formatted(.dateTime.weekday(.abbreviated).day().month().hour().minute()))
                    .font(.caption)
                    .foregroundStyle(.secondary)
                Spacer()
                Text(durationLabel)
                    .font(.caption2)
                    .foregroundStyle(.tertiary)
            }

            Text(preview)
                .font(.subheadline)
                .foregroundStyle(.primary)

            if let obs = entry.observation {
                Text(obs.text)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .italic()
            }
        }
        .padding()
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 14))
    }
}
