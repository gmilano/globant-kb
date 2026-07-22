import SwiftUI
import SwiftData

struct EntryDetailView: View {
    let entry: Entry
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                Text(entry.transcript)
                    .font(.title3)
                    .fontDesign(.serif)
                    .frame(maxWidth: .infinity, alignment: .leading)

                if let obs = entry.observation {
                    Divider()
                    Text(obs.text)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.leading, 8)
                }
            }
            .padding()
        }
        .navigationTitle(entry.recordedAt.formatted(.dateTime.weekday(.wide).day().month()))
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .destructiveAction) {
                Button(role: .destructive) {
                    deleteEntry()
                } label: {
                    Image(systemName: "trash")
                }
            }
        }
    }

    private func deleteEntry() {
        if let filename = entry.audioFilename {
            AudioFileStore.delete(filename: filename)
        }
        modelContext.delete(entry)
        try? modelContext.save()
        dismiss()
    }
}
