import SwiftUI
import SwiftData

struct SettingsView: View {
    @AppStorage("appearance") private var appearance: AppearanceMode = .system
    @AppStorage("fontSizeOffset") private var fontSizeOffset: Double = 0
    @AppStorage("sundayNotification") private var sundayNotification: Bool = true

    @Environment(\.modelContext) private var modelContext
    @State private var showDeleteConfirm = false

    var body: some View {
        Form {
            Section("Apariencia") {
                Picker("Tema", selection: $appearance) {
                    Text("Sistema").tag(AppearanceMode.system)
                    Text("Claro").tag(AppearanceMode.light)
                    Text("Oscuro").tag(AppearanceMode.dark)
                }
                .pickerStyle(.segmented)

                HStack {
                    Text("Texto")
                    Spacer()
                    Button("A−") { fontSizeOffset = max(-2, fontSizeOffset - 1) }
                        .buttonStyle(.bordered)
                    Button("A+") { fontSizeOffset = min(4, fontSizeOffset + 1) }
                        .buttonStyle(.bordered)
                }
            }

            Section("Resumen dominical") {
                Toggle("Notificación los domingos", isOn: $sundayNotification)
                    .onChange(of: sundayNotification) { _, enabled in
                        if enabled { requestNotificationPermission() }
                    }
            }

            Section("Datos") {
                Button("Exportar transcripts") {
                    exportTranscripts()
                }

                Button("Borrar todo", role: .destructive) {
                    showDeleteConfirm = true
                }
            }

            Section {
                HStack {
                    Text("Wany Journal")
                    Spacer()
                    Text("1.0")
                        .foregroundStyle(.secondary)
                }
                Text("Sin cuenta. Sin red. Sin servidores.")
                    .font(.caption)
                    .foregroundStyle(.tertiary)
            }
        }
        .navigationTitle("Configuración")
        .confirmationDialog(
            "¿Borrar todas las entradas y loops?",
            isPresented: $showDeleteConfirm,
            titleVisibility: .visible
        ) {
            Button("Borrar todo", role: .destructive) { deleteAll() }
            Button("Cancelar", role: .cancel) {}
        } message: {
            Text("Esta acción no se puede deshacer.")
        }
    }

    private func deleteAll() {
        try? modelContext.delete(model: Entry.self)
        try? modelContext.delete(model: DetectedLoop.self)
        try? modelContext.delete(model: WeeklySummary.self)
        try? modelContext.save()
    }

    private func exportTranscripts() {
        let entries = (try? modelContext.fetch(FetchDescriptor<Entry>(sort: [SortDescriptor(\.recordedAt)]))) ?? []
        let text = entries.map { entry in
            "[\(entry.recordedAt.formatted())] (\(Int(entry.duration))s)\n\(entry.transcript)"
        }.joined(separator: "\n\n---\n\n")

        let url = FileManager.default.temporaryDirectory.appending(path: "wany-export.txt")
        try? text.write(to: url, atomically: true, encoding: .utf8)

        #if os(iOS)
        let av = UIActivityViewController(activityItems: [url], applicationActivities: nil)
        UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .first?.windows.first?.rootViewController?
            .present(av, animated: true)
        #endif
    }

    private func requestNotificationPermission() {
        Task {
            try? await UNUserNotificationCenter.current()
                .requestAuthorization(options: [.alert, .sound])
        }
    }
}

enum AppearanceMode: String {
    case system, light, dark

    var colorScheme: ColorScheme? {
        switch self {
        case .system: return nil
        case .light:  return .light
        case .dark:   return .dark
        }
    }
}
