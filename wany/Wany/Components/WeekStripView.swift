import SwiftUI
import SwiftData

struct WeekStripView: View {
    @Query(sort: \Entry.recordedAt) private var entries: [Entry]

    private var thisWeekDays: [Date] {
        let cal = Calendar.current
        let today = cal.startOfDay(for: .now)
        let weekday = cal.component(.weekday, from: today)
        let startOfWeek = cal.date(byAdding: .day, value: -(weekday - 2), to: today) ?? today
        return (0..<7).compactMap { cal.date(byAdding: .day, value: $0, to: startOfWeek) }
    }

    private var entryDays: Set<String> {
        let cal = Calendar.current
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        return Set(entries
            .filter { cal.isDate($0.recordedAt, equalTo: .now, toGranularity: .weekOfYear) }
            .map { formatter.string(from: $0.recordedAt) })
    }

    var body: some View {
        HStack(spacing: 8) {
            ForEach(thisWeekDays, id: \.self) { day in
                DayDot(date: day, hasEntry: dayHasEntry(day))
            }
        }
        .padding(.horizontal)
    }

    private func dayHasEntry(_ date: Date) -> Bool {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        return entryDays.contains(formatter.string(from: date))
    }
}

struct DayDot: View {
    let date: Date
    let hasEntry: Bool

    private var isToday: Bool { Calendar.current.isDateInToday(date) }

    var body: some View {
        VStack(spacing: 4) {
            Text(date.formatted(.dateTime.weekday(.narrow)))
                .font(.caption2)
                .foregroundStyle(isToday ? .primary : .tertiary)

            Circle()
                .fill(hasEntry ? Color.accentColor : Color.secondary.opacity(0.2))
                .frame(width: 8, height: 8)
        }
        .frame(maxWidth: .infinity)
    }
}
