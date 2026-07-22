import SwiftUI
import Speech

struct OnboardingView: View {
    @AppStorage("onboardingDone") private var onboardingDone = false
    @State private var step = 0

    var body: some View {
        ZStack {
            switch step {
            case 0: WelcomeStep(onNext: { step = 1 })
            case 1: PrivacyStep(onNext: { step = 2 })
            case 2: MicrophoneStep(onNext: { step = 3 })
            case 3: LoopsIntroStep(onNext: { step = 4 })
            default: FirstEntryStep(onDone: { onboardingDone = true })
            }
        }
        .animation(.easeInOut(duration: 0.4), value: step)
    }
}

// MARK: — Step 1: Welcome

private struct WelcomeStep: View {
    let onNext: () -> Void

    var body: some View {
        OnboardingShell(step: 0) {
            VStack(spacing: 32) {
                Spacer()

                VStack(spacing: 16) {
                    Text("Wany")
                        .font(.system(size: 64, weight: .bold, design: .rounded))

                    Text("Un journal de voz.\nNada sale de tu teléfono.")
                        .font(.title3)
                        .multilineTextAlignment(.center)
                        .foregroundStyle(.secondary)
                }

                Spacer()

                OnboardingButton("Empezar", action: onNext)
            }
        }
    }
}

// MARK: — Step 2: Privacy

private struct PrivacyStep: View {
    let onNext: () -> Void

    var body: some View {
        OnboardingShell(step: 1) {
            VStack(spacing: 32) {
                Spacer()

                VStack(spacing: 24) {
                    Image(systemName: "lock.shield")
                        .font(.system(size: 64))
                        .foregroundStyle(.tint)

                    Text("Privacidad real")
                        .font(.title.bold())

                    VStack(alignment: .leading, spacing: 16) {
                        PrivacyRow(icon: "airplane", text: "Funciona en modo avión. Siempre.")
                        PrivacyRow(icon: "server.rack", text: "No hay servidor. No hay cuenta.")
                        PrivacyRow(icon: "eye.slash", text: "No hay analytics ni tracking.")
                        PrivacyRow(icon: "brain", text: "La IA corre en tu dispositivo.")
                    }
                    .padding()
                    .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 16))
                }

                Spacer()

                OnboardingButton("Entendido", action: onNext)
            }
        }
    }
}

private struct PrivacyRow: View {
    let icon: String
    let text: String

    var body: some View {
        Label(text, systemImage: icon)
            .font(.body)
    }
}

// MARK: — Step 3: Microphone

private struct MicrophoneStep: View {
    let onNext: () -> Void
    @State private var status: PermissionStatus = .pending

    enum PermissionStatus { case pending, granted, denied }

    var body: some View {
        OnboardingShell(step: 2) {
            VStack(spacing: 32) {
                Spacer()

                VStack(spacing: 16) {
                    Image(systemName: "mic.circle.fill")
                        .font(.system(size: 72))
                        .foregroundStyle(.tint)

                    Text("Acceso al micrófono")
                        .font(.title.bold())

                    Text("Wany necesita el micrófono para grabar tus entradas. La transcripción ocurre en el dispositivo.")
                        .font(.body)
                        .multilineTextAlignment(.center)
                        .foregroundStyle(.secondary)
                }

                Spacer()

                switch status {
                case .pending:
                    OnboardingButton("Permitir micrófono") {
                        requestMicrophone()
                    }
                case .granted:
                    OnboardingButton("Continuar", action: onNext)
                case .denied:
                    VStack(spacing: 12) {
                        Text("Permiso denegado. Habilitalo en Ajustes → Wany → Micrófono.")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                            .multilineTextAlignment(.center)
                        OnboardingButton("Continuar de todas formas", action: onNext)
                    }
                }
            }
        }
    }

    private func requestMicrophone() {
        AVAudioApplication.requestRecordPermission { granted in
            DispatchQueue.main.async {
                status = granted ? .granted : .denied
                if granted { onNext() }
            }
        }
    }
}

// MARK: — Step 4: Loops intro

private struct LoopsIntroStep: View {
    let onNext: () -> Void

    var body: some View {
        OnboardingShell(step: 3) {
            VStack(spacing: 32) {
                Spacer()

                VStack(spacing: 16) {
                    Image(systemName: "arrow.trianglehead.2.clockwise")
                        .font(.system(size: 64))
                        .foregroundStyle(.tint)

                    Text("Loops")
                        .font(.title.bold())

                    Text("Mientras hablás, Wany detecta tus patrones personales — loops de salud, ejercicio, relaciones, práctica espiritual.")
                        .font(.body)
                        .multilineTextAlignment(.center)
                        .foregroundStyle(.secondary)

                    Text("Cuando querés mejorar uno, Wany lee tus entradas y te muestra qué condiciones ya funcionan en tu vida.")
                        .font(.body)
                        .multilineTextAlignment(.center)
                        .foregroundStyle(.secondary)
                }

                Spacer()

                OnboardingButton("Entendido", action: onNext)
            }
        }
    }
}

// MARK: — Step 5: First Entry

private struct FirstEntryStep: View {
    let onDone: () -> Void
    @State private var session = RecordingSession()
    @State private var recorded = false
    @Environment(\.modelContext) private var modelContext

    var body: some View {
        OnboardingShell(step: 4) {
            VStack(spacing: 32) {
                Spacer()

                if recorded {
                    VStack(spacing: 16) {
                        Image(systemName: "checkmark.circle.fill")
                            .font(.system(size: 64))
                            .foregroundStyle(.green)
                        Text("Primera entrada guardada")
                            .font(.title2.bold())
                    }
                } else {
                    VStack(spacing: 16) {
                        Image(systemName: "waveform")
                            .font(.system(size: 64))
                            .foregroundStyle(.tint)

                        Text("Grabá tu primera entrada")
                            .font(.title.bold())

                        Text("Decí lo que sea. Cómo te sentís hoy, qué tenés en la cabeza. Wany lo guarda.")
                            .font(.body)
                            .multilineTextAlignment(.center)
                            .foregroundStyle(.secondary)
                    }
                }

                Spacer()

                if recorded {
                    OnboardingButton("Abrir Wany", action: onDone)
                } else {
                    VStack(spacing: 12) {
                        RecordButtonView(session: session) { finished in
                            let entry = Entry(transcript: finished.transcript, duration: finished.duration, audioFilename: finished.audioFilename)
                            modelContext.insert(entry)
                            try? modelContext.save()
                            recorded = true
                        }

                        Button("Saltear") { onDone() }
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                    }
                }
            }
        }
    }
}

// MARK: — Shared shell

private struct OnboardingShell<Content: View>: View {
    let step: Int
    @ViewBuilder let content: Content

    private let totalSteps = 5

    var body: some View {
        VStack {
            HStack(spacing: 6) {
                ForEach(0..<totalSteps, id: \.self) { i in
                    Capsule()
                        .fill(i == step ? Color.accentColor : Color.secondary.opacity(0.3))
                        .frame(width: i == step ? 24 : 8, height: 6)
                        .animation(.spring(duration: 0.3), value: step)
                }
            }
            .padding(.top)

            content
                .padding(.horizontal, 32)
                .padding(.bottom, 40)
        }
    }
}

private struct OnboardingButton: View {
    let title: String
    let action: () -> Void

    init(_ title: String, action: @escaping () -> Void) {
        self.title = title
        self.action = action
    }

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.headline)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 16)
        }
        .buttonStyle(.borderedProminent)
        .controlSize(.large)
    }
}
