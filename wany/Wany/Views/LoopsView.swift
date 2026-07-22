import SwiftUI
import SwiftData

struct LoopsView: View {
    @Query(sort: \DetectedLoop.lastMentionedAt, order: .reverse) private var loops: [DetectedLoop]

    private var activeLoops: [DetectedLoop] { loops.filter { $0.status == .active || $0.status == .shifting } }
    private var dormantLoops: [DetectedLoop] { loops.filter { $0.status == .dormant || $0.status == .broken } }
    private var improvementLoops: [DetectedLoop] { loops.filter { $0.isImprovement } }

    private var collisions: [(DetectedLoop, DetectedLoop)] { loops.activeCollisions }

    var body: some View {
        NavigationStack {
            List {
                if !collisions.isEmpty {
                    Section("Tensiones activas") {
                        ForEach(collisions, id: \.0.id) { a, b in
                            LoopCollisionView(loopA: a, loopB: b)
                                .listRowInsets(EdgeInsets(top: 8, leading: 8, bottom: 8, trailing: 8))
                                .listRowBackground(Color.clear)
                        }
                    }
                }

                if !improvementLoops.isEmpty {
                    Section("En mejora") {
                        ForEach(improvementLoops) { loop in
                            NavigationLink(destination: ImprovementLoopView(loop: loop)) {
                                LoopRowView(loop: loop)
                            }
                        }
                    }
                }

                if !activeLoops.filter({ !$0.isImprovement }).isEmpty {
                    Section("Detectados") {
                        ForEach(activeLoops.filter { !$0.isImprovement }) { loop in
                            NavigationLink(destination: LoopDetailView(loop: loop)) {
                                LoopRowView(loop: loop)
                            }
                        }
                    }
                }

                if !dormantLoops.isEmpty {
                    Section("Dormidos") {
                        ForEach(dormantLoops) { loop in
                            NavigationLink(destination: LoopDetailView(loop: loop)) {
                                LoopRowView(loop: loop)
                            }
                        }
                    }
                }

                if loops.isEmpty {
                    ContentUnavailableView(
                        "Sin loops aún",
                        systemImage: "arrow.trianglehead.2.clockwise",
                        description: Text("Los loops aparecen después de algunas entradas.")
                    )
                }
            }
            .listStyle(.insetGrouped)
            .navigationTitle("Loops")
        }
    }
}

struct LoopRowView: View {
    let loop: DetectedLoop

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: loop.category.systemImage)
                .frame(width: 28)
                .foregroundStyle(.tint)

            VStack(alignment: .leading, spacing: 2) {
                Text(loop.name)
                    .font(.body)

                HStack(spacing: 6) {
                    Text(loop.status.label)
                        .font(.caption)
                        .foregroundStyle(.secondary)

                    if loop.status == .dormant {
                        Text("· \(loop.daysSinceLastMention)d sin aparecer")
                            .font(.caption)
                            .foregroundStyle(.tertiary)
                    } else {
                        Text("· \(loop.mentionCount)×")
                            .font(.caption)
                            .foregroundStyle(.tertiary)
                    }
                }
            }

            Spacer()

            Text(loop.momentum.symbol)
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .padding(.vertical, 4)
    }
}
