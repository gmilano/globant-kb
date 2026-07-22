import SwiftUI
import SwiftData

@main
struct WanyApp: App {
    #if os(iOS)
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    #endif

    @AppStorage("onboardingDone") private var onboardingDone = false

    private var sharedContainer: ModelContainer = {
        try! ModelContainer(for: Entry.self, DetectedLoop.self, WeeklySummary.self)
    }()

    var body: some Scene {
        WindowGroup {
            Group {
                if onboardingDone {
                    RootView()
                        .task { await checkAndTriggerSundaySummary() }
                } else {
                    OnboardingView()
                }
            }
        }
        .modelContainer(sharedContainer)

        #if os(macOS)
        MenuBarExtra("Wany", systemImage: "waveform.circle.fill") {
            MenuBarView()
                .modelContainer(sharedContainer)
        }
        .menuBarExtraStyle(.window)

        Settings {
            NavigationStack { SettingsView() }
                .modelContainer(sharedContainer)
        }
        #endif
    }

    // Fallback: if background task didn't fire, generate summary on open
    @MainActor
    private func checkAndTriggerSundaySummary() async {
        guard Calendar.current.component(.weekday, from: .now) == 1 else { return }
        let weekKey = Entry.weekKey(for: .now)
        let container = try? ModelContainer(for: Entry.self, DetectedLoop.self, WeeklySummary.self)
        guard let ctx = container?.mainContext else { return }

        let summaries = (try? ctx.fetch(FetchDescriptor<WeeklySummary>())) ?? []
        guard !summaries.contains(where: { $0.weekKey == weekKey }) else { return }

        let entries = (try? ctx.fetch(FetchDescriptor<Entry>())) ?? []
        let weekEntries = entries.filter { $0.weekKey == weekKey }
        let loops = (try? ctx.fetch(FetchDescriptor<DetectedLoop>())) ?? []

        await WeeklySummaryJob(modelContext: ctx).run(
            weekKey: weekKey,
            entries: weekEntries,
            improvementLoops: loops.filter { $0.isImprovement }
        )
    }
}
