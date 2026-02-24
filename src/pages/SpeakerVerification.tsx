import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, UserCheck, AlertTriangle, XCircle } from "lucide-react";

type Decision = "match" | "mismatch" | "suspicious" | null;

const SpeakerVerification = () => {
  const [refUploaded, setRefUploaded] = useState(false);
  const [testUploaded, setTestUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [decision, setDecision] = useState<Decision>(null);

  const analyze = () => {
    setAnalyzing(true);
    // Weighted: 60% match, 25% suspicious, 15% mismatch
    const roll = Math.random();
    const chosen: Decision = roll < 0.60 ? "match" : roll < 0.85 ? "suspicious" : "mismatch";
    setTimeout(() => {
      setDecision(chosen);
      setAnalyzing(false);
    }, 2500);
  };

  const jitter = () => +(Math.random() * 0.06 - 0.03).toFixed(2); // ±0.03 variance
  const scores = {
    match: { cos: +(0.93 + jitter()).toFixed(2), prob: Math.min(99, 95 + Math.floor(Math.random() * 4)), color: "text-success", icon: UserCheck, label: "✅ Match" },
    mismatch: { cos: +(0.21 + jitter()).toFixed(2), prob: Math.max(3, 7 + Math.floor(Math.random() * 5)), color: "text-danger", icon: XCircle, label: "❌ Mismatch" },
    suspicious: { cos: +(0.59 + jitter()).toFixed(2), prob: 50 + Math.floor(Math.random() * 10), color: "text-warning", icon: AlertTriangle, label: "⚠ Suspicious Deviation" },
  };

  const d = decision ? scores[decision] : null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-xl font-bold text-foreground">Speaker Verification</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Reference Voice */}
        <button
          onClick={() => setRefUploaded(true)}
          className={`glass-panel p-8 text-center transition-colors ${
            refUploaded ? "border-success/50" : "hover:bg-primary/5"
          }`}
        >
          <Upload className={`w-8 h-8 mx-auto mb-3 ${refUploaded ? "text-success" : "text-muted-foreground"}`} />
          <p className="text-sm font-medium text-foreground">
            {refUploaded ? "Reference Voice Uploaded" : "Upload Reference Voice"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Known speaker sample</p>
        </button>

        {/* Test Voice */}
        <button
          onClick={() => setTestUploaded(true)}
          className={`glass-panel p-8 text-center transition-colors ${
            testUploaded ? "border-success/50" : "hover:bg-primary/5"
          }`}
        >
          <Upload className={`w-8 h-8 mx-auto mb-3 ${testUploaded ? "text-success" : "text-muted-foreground"}`} />
          <p className="text-sm font-medium text-foreground">
            {testUploaded ? "Test Voice Uploaded" : "Upload Test Voice"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Voice to verify</p>
        </button>
      </div>

      {refUploaded && testUploaded && !decision && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <button
            onClick={analyze}
            disabled={analyzing}
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors glow-primary disabled:opacity-50"
          >
            {analyzing ? "Analyzing..." : "Run Verification"}
          </button>
        </motion.div>
      )}

      {analyzing && (
        <div className="glass-panel p-8 text-center">
          <div className="w-12 h-12 mx-auto border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground mt-4">Computing speaker embeddings...</p>
        </div>
      )}

      {d && decision && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="glass-panel p-6 text-center">
            <p className={`text-2xl font-bold ${d.color}`}>{d.label}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="glass-panel p-4 text-center">
              <p className="text-2xl font-mono font-bold text-foreground">{d.cos}</p>
              <p className="text-xs text-muted-foreground mt-1">Cosine Similarity</p>
            </div>
            <div className="glass-panel p-4 text-center">
              <p className="text-2xl font-mono font-bold text-foreground">{d.prob}%</p>
              <p className="text-xs text-muted-foreground mt-1">Match Probability</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center italic">
            Based on text-independent speaker verification model.
          </p>

          <button
            onClick={() => { setDecision(null); setRefUploaded(false); setTestUploaded(false); }}
            className="block mx-auto text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ↻ New Verification
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default SpeakerVerification;
