import SwiftUI
import SwiftData

// Shown when two active improvement loops are flagged as colliding
struct LoopCollisionView: View {
    let loopA: DetectedLoop
    let loopB: DetectedLoop

    var body: some View {
        VStack(spacing: 24) {
            Text("Tensión entre loops")
                .font(.headline)
                .foregroundStyle(.secondary)

            HStack(spacing: 0) {
                LoopPill(loop: loopA)

                Image(systemName: "arrow.trianglehead.2.clockwise.rotate.90")
                    .font(.title2)
                    .foregroundStyle(.orange)
                    .padding(.horizontal, 8)

                LoopPill(loop: loopB)
            }

            Text("Estos dos loops compiten. No podés tener los dos activos sin resolver esa tensión primero.")
                .font(.body)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
        }
        .padding()
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 16))
    }
}

private struct LoopPill: View {
    let loop: DetectedLoop

    var body: some View {
        VStack(spacing: 6) {
            Image(systemName: loop.category.systemImage)
                .font(.title3)
                .foregroundStyle(.tint)
            Text(loop.name)
                .font(.caption.bold())
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 12))
    }
}

// MARK: — Collision detection helper

extension [DetectedLoop] {
    var activeCollisions: [(DetectedLoop, DetectedLoop)] {
        let improvement = self.filter { $0.isImprovement && $0.status == .active }
        var pairs: [(DetectedLoop, DetectedLoop)] = []
        for a in improvement {
            guard let collidingName = a.collidesWithLoopNamed else { continue }
            if let b = improvement.first(where: { $0.name.lowercased() == collidingName.lowercased() }) {
                let alreadyAdded = pairs.contains { $0.0.id == b.id && $0.1.id == a.id }
                if !alreadyAdded {
                    pairs.append((a, b))
                }
            }
        }
        return pairs
    }
}
