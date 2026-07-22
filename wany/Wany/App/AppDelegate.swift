import UIKit
import BackgroundTasks
import SwiftData

// iOS only — macOS uses NSApplicationDelegate pattern
#if os(iOS)
final class AppDelegate: NSObject, UIApplicationDelegate {

    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        registerBackgroundTasks()
        return true
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        scheduleWeeklySummaryTask()
        scheduleLoopDetectionTask()
    }

    // MARK: — Registration

    private func registerBackgroundTasks() {
        BGTaskScheduler.shared.register(
            forTaskWithIdentifier: BackgroundTaskID.weeklySummary,
            using: nil
        ) { task in
            self.handleWeeklySummaryTask(task as! BGProcessingTask)
        }

        BGTaskScheduler.shared.register(
            forTaskWithIdentifier: BackgroundTaskID.loopDetection,
            using: nil
        ) { task in
            self.handleLoopDetectionTask(task as! BGProcessingTask)
        }
    }

    // MARK: — Scheduling

    private func scheduleWeeklySummaryTask() {
        let request = BGProcessingTaskRequest(identifier: BackgroundTaskID.weeklySummary)
        request.requiresNetworkConnectivity = false
        request.requiresExternalPower = false
        // Run Sunday morning
        request.earliestBeginDate = nextSunday8AM()
        try? BGTaskScheduler.shared.submit(request)
    }

    private func scheduleLoopDetectionTask() {
        let request = BGProcessingTaskRequest(identifier: BackgroundTaskID.loopDetection)
        request.requiresNetworkConnectivity = false
        request.requiresExternalPower = false
        // Run daily
        request.earliestBeginDate = Date(timeIntervalSinceNow: 86_400)
        try? BGTaskScheduler.shared.submit(request)
    }

    // MARK: — Handlers

    private func handleWeeklySummaryTask(_ task: BGProcessingTask) {
        let container = try? ModelContainer(for: Entry.self, DetectedLoop.self, WeeklySummary.self)

        let taskWork = Task {
            guard let ctx = container?.mainContext else { task.setTaskCompleted(success: false); return }
            let weekKey = Entry.weekKey(for: .now)

            let existingSummaries = (try? ctx.fetch(FetchDescriptor<WeeklySummary>())) ?? []
            guard !existingSummaries.contains(where: { $0.weekKey == weekKey }) else {
                task.setTaskCompleted(success: true)
                return
            }

            let entries = (try? ctx.fetch(FetchDescriptor<Entry>())) ?? []
            let weekEntries = entries.filter { $0.weekKey == weekKey }
            let loops = (try? ctx.fetch(FetchDescriptor<DetectedLoop>())) ?? []
            let improvementLoops = loops.filter { $0.isImprovement }

            await WeeklySummaryJob(modelContext: ctx).run(
                weekKey: weekKey,
                entries: weekEntries,
                improvementLoops: improvementLoops
            )
            task.setTaskCompleted(success: true)
        }

        task.expirationHandler = { taskWork.cancel() }
        scheduleWeeklySummaryTask()
    }

    private func handleLoopDetectionTask(_ task: BGProcessingTask) {
        let container = try? ModelContainer(for: Entry.self, DetectedLoop.self, WeeklySummary.self)

        let taskWork = Task {
            guard let ctx = container?.mainContext else { task.setTaskCompleted(success: false); return }
            let entries = (try? ctx.fetch(FetchDescriptor<Entry>())) ?? []
            let existing = (try? ctx.fetch(FetchDescriptor<DetectedLoop>())) ?? []
            await LoopDetectionJob(modelContext: ctx).run(entries: entries, existingLoops: existing)
            task.setTaskCompleted(success: true)
        }

        task.expirationHandler = { taskWork.cancel() }
        scheduleLoopDetectionTask()
    }

    // MARK: — Helpers

    private func nextSunday8AM() -> Date {
        var cal = Calendar.current
        cal.locale = .current
        let now = Date.now
        let weekday = cal.component(.weekday, from: now)
        let daysUntilSunday = (8 - weekday) % 7
        let nextSunday = cal.date(byAdding: .day, value: daysUntilSunday == 0 ? 7 : daysUntilSunday, to: now)!
        return cal.date(bySettingHour: 8, minute: 0, second: 0, of: nextSunday)!
    }
}

enum BackgroundTaskID {
    static let weeklySummary = "ai.wany.journal.weeklysummary"
    static let loopDetection = "ai.wany.journal.loopdetection"
}
#endif
