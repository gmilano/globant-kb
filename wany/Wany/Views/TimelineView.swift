import SwiftUI
import SwiftData

struct TimelineView: View {
    @Query(sort: \Entry.recordedAt, order: .reverse) private var entries: [Entry]
    @State private var searchText = ""

    private var grouped: [(String, [Entry])] {
        let filtered = searchText.isEmpty
            ? entries
            : entries.filter { $0.transcript.localizedCaseInsensitiveContains(searchText) }

        let dict = Dictionary(grouping: filtered) { $0.weekKey }
        return dict.sorted { $0.key > $1.key }
    }

    var body: some View {
        NavigationStack {
            List {
                ForEach(grouped, id: \.0) { weekKey, weekEntries in
                    Section(header: Text(weekKey).font(.footnote)) {
                        ForEach(weekEntries) { entry in
                            NavigationLink(destination: EntryDetailView(entry: entry)) {
                                EntryCardView(entry: entry)
                            }
                        }
                    }
                }
            }
            .listStyle(.insetGrouped)
            .searchable(text: $searchText, prompt: "Buscar")
            .navigationTitle("Todo")
        }
    }
}
