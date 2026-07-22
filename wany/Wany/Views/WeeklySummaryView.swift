import SwiftUI

struct WeeklySummaryView: View {
    let summary: WeeklySummary
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 28) {

                VStack(alignment: .leading, spacing: 6) {
                    Text("Tu semana")
                        .font(.largeTitle.bold())
                    Text("\(summary.entryCount) entradas · \(formattedDuration)")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }

                Text(summary.narrativeText)
                    .font(.body)
                    .fontDesign(.serif)
                    .lineSpacing(4)

                if !summary.loopReports.isEmpty {
                    Divider()

                    Text("Loops en mejora")
                        .font(.headline)

                    ForEach(Array(summary.loopReports), id: \.key) { name, report in
                        VStack(alignment: .leading, spacing: 6) {
                            Text(name)
                                .font(.subheadline.bold())
                            Text(report)
                                .font(.body)
                                .foregroundStyle(.secondary)
                        }
                        .padding()
                        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 12))
                    }
                }

                Button("Listo") { dismiss() }
                    .buttonStyle(.borderedProminent)
                    .frame(maxWidth: .infinity)
            }
            .padding()
        }
    }

    private var formattedDuration: String {
        let total = Int(summary.totalDuration)
        let minutes = total / 60
        return minutes < 60 ? "\(minutes) min" : "\(minutes / 60)h \(minutes % 60)m"
    }
}

struct SundaySummaryBanner: View {
    let summary: WeeklySummary
    @State private var showFull = false

    var body: some View {
        Button {
            showFull = true
        } label: {
            VStack(alignment: .leading, spacing: 8) {
                Label("Resumen de la semana", systemImage: "calendar")
                    .font(.caption.bold())
                    .foregroundStyle(.tint)

                Text(summary.narrativeText)
                    .font(.subheadline)
                    .foregroundStyle(.primary)
                    .lineLimit(3)
                    .multilineTextAlignment(.leading)

                Text("Leer completo →")
                    .font(.caption)
                    .foregroundStyle(.tint)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding()
            .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 16))
        }
        .buttonStyle(.plain)
        .sheet(isPresented: $showFull) {
            WeeklySummaryView(summary: summary)
        }
    }
}
