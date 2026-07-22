import Foundation

enum AudioFileStore {
    private static var audioDirectory: URL {
        let base = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
        let dir = base.appending(path: "audio", directoryHint: .isDirectory)
        try? FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        return dir
    }

    static func url(for filename: String) -> URL {
        audioDirectory.appending(path: filename)
    }

    static func delete(filename: String) {
        let url = audioDirectory.appending(path: filename)
        try? FileManager.default.removeItem(at: url)
    }

    static func exists(filename: String) -> Bool {
        FileManager.default.fileExists(atPath: url(for: filename).path)
    }
}
