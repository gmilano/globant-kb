# Wany Journal

Voice journal. On-device intelligence. Nothing leaves your phone.

## Stack

- Swift 6 (strict concurrency)
- SwiftUI + Liquid Glass
- SwiftData
- SpeechAnalyzer (on-device transcription, iOS 26+)
- Foundation Models — 3B param Apple Intelligence model
- Zero third-party dependencies

## Setup

### Prerequisites

```bash
brew install xcodegen
```

### Generate Xcode project

```bash
cd wany/
xcodegen generate
open Wany.xcodeproj
```

### Signing

1. Select `Wany-iOS` target
2. Signing & Capabilities → set your Team
3. Add entitlements manually if xcodegen doesn't wire them:
   - `com.apple.security.device.audio-input`
   - `com.apple.developer.foundation-models`

### iOS 26 requirement

Foundation Models and SpeechAnalyzer require iOS 26 / macOS 26.
Run on a physical device for Neural Engine acceleration.
Simulator may not support Foundation Models.

## Architecture

```
App/            Entry point, background task registration
Model/          SwiftData models — Entry, DetectedLoop, LoopSuggestion, WeeklySummary
Recording/      AVAudioEngine + SpeechAnalyzer pipeline
Intelligence/   Four jobs (all fire async, all silent on failure):
                  ObservationJob      — per entry, observer mode
                  LoopDetectionJob    — every 5 entries, cross-entry analysis
                  FrictionMappingJob  — on-demand for Improvement Loops
                  WeeklySummaryJob    — Sunday, narrative + per-loop reports
Views/          Home, Timeline, Loops, ImprovementLoop, WeeklySummary, Settings
Components/     EntryCardView, WeekStripView
```

## The rules the model follows

Observer mode (default):
- One sentence or nothing
- Never advises, never motivates, never asks questions
- Responds `(nothing)` when it has nothing real to say → nothing is stored

Improvement loop mode (user opt-in):
- Maps friction: what conditions make the loop happen, what blocks it
- Points to one concrete window if visible in entries
- Never uses "should", "must", "need to"
- Never creates plans

## Privacy

- Zero network calls (NSAllowsArbitraryLoads = false)
- No analytics, no tracking, no account
- Audio stored in app's applicationSupportDirectory
- iCloud backup: user's choice, not ours
