import SwiftUI
import SwiftData

struct RootView: View {
    @AppStorage("appearance") private var appearance: AppearanceMode = .system

    var body: some View {
        TabView {
            Tab("Hoy", systemImage: "mic.circle") {
                HomeView()
            }
            Tab("Loops", systemImage: "arrow.trianglehead.2.clockwise") {
                LoopsView()
            }
            Tab("Todo", systemImage: "list.bullet") {
                TimelineView()
            }
            #if os(iOS)
            Tab("Ajustes", systemImage: "gearshape") {
                NavigationStack { SettingsView() }
            }
            #endif
        }
        .tabViewStyle(.sidebarAdaptable)
        .preferredColorScheme(appearance.colorScheme)
    }
}
