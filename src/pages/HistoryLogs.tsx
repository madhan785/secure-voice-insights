import { Clock } from "lucide-react";

const logs = [
  { time: "14:32:01", type: "genuine", confidence: 96, file: "sample_001.wav" },
  { time: "14:28:45", type: "synthetic", confidence: 89, file: "call_recording.mp3" },
  { time: "13:55:12", type: "genuine", confidence: 94, file: "live_capture_03.wav" },
  { time: "13:41:30", type: "suspicious", confidence: 62, file: "upload_test.wav" },
  { time: "12:15:08", type: "genuine", confidence: 98, file: "ref_speaker_a.wav" },
  { time: "11:50:22", type: "synthetic", confidence: 91, file: "deepfake_demo.mp3" },
];

const typeStyles: Record<string, string> = {
  genuine: "text-success bg-success/10",
  suspicious: "text-warning bg-warning/10",
  synthetic: "text-danger bg-danger/10",
};

const HistoryLogs = () => (
  <div className="max-w-4xl mx-auto space-y-6">
    <h2 className="text-xl font-bold text-foreground">History Logs</h2>

    <div className="glass-panel overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-xs text-muted-foreground">
            <th className="text-left p-3 font-medium">Time</th>
            <th className="text-left p-3 font-medium">File</th>
            <th className="text-left p-3 font-medium">Result</th>
            <th className="text-right p-3 font-medium">Confidence</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="p-3 font-mono text-muted-foreground flex items-center gap-2">
                <Clock className="w-3 h-3" /> {log.time}
              </td>
              <td className="p-3 font-mono text-foreground">{log.file}</td>
              <td className="p-3">
                <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${typeStyles[log.type]}`}>
                  {log.type}
                </span>
              </td>
              <td className="p-3 text-right font-mono text-foreground">{log.confidence}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default HistoryLogs;
