import { Settings as SettingsIcon } from "lucide-react";

const SettingsPage = () => (
  <div className="max-w-2xl mx-auto space-y-6">
    <h2 className="text-xl font-bold text-foreground">Settings</h2>

    <div className="glass-panel p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <SettingsIcon className="w-4 h-4 text-primary" /> Detection Configuration
        </h3>
        <div className="space-y-3">
          {[
            { label: "Risk Alert Threshold", value: "70%", desc: "Alert when risk exceeds this value" },
            { label: "Default Sample Rate", value: "48kHz", desc: "Audio capture quality" },
            { label: "Model Version", value: "v2.4.1", desc: "Current detection model" },
            { label: "Auto-save Recordings", value: "Enabled", desc: "Store analyzed audio files" },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between p-3 rounded-md bg-muted/30">
              <div>
                <p className="text-sm text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
              <span className="font-mono text-sm text-primary">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-4 space-y-2">
        <h3 className="text-sm font-semibold text-foreground">About</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          AI Voice Authentication & Deepfake Detection System — Real-time synthetic and mimicry voice risk analysis platform. Uses advanced MFCC, prosodic analysis, and deep neural network models for voice verification and forensic analysis.
        </p>
        <h3 className="text-sm font-semibold text-foreground mt-4">Privacy Policy</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          All voice data is processed locally and encrypted. No audio samples are shared with third parties. User consent is required before any voice analysis begins. Data retention follows configurable policies.
        </p>
      </div>
    </div>
  </div>
);

export default SettingsPage;
