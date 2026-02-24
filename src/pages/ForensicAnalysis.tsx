import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const generateSpectrogram = () =>
  Array.from({ length: 30 }, () =>
    Array.from({ length: 50 }, () => Math.random())
  );

const ForensicAnalysis = () => {
  const [specData] = useState(generateSpectrogram);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(t);
  }, []);

  // More realistic forensic scores — low artifact = more genuine
  const artifactScore = +(0.15 + Math.random() * 0.35).toFixed(2); // 0.15–0.50 range (low = genuine)
  const scores = [
    { label: "Synthetic Artifact Score", value: artifactScore.toString(), high: artifactScore > 0.40 },
    { label: "Temporal Irregularity Index", value: (0.08 + Math.random() * 0.25).toFixed(2), high: false },
    { label: "Voice Stability Index", value: (0.75 + Math.random() * 0.20).toFixed(2), high: false },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-xl font-bold text-foreground">Forensic Analysis</h2>

      {/* Mel-Spectrogram */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        className="glass-panel p-4 space-y-2"
      >
        <p className="text-xs text-muted-foreground font-mono">MEL-SPECTROGRAM VISUALIZATION</p>
        <div className="flex flex-col gap-px rounded overflow-hidden">
          {specData.map((row, ri) => (
            <div key={ri} className="flex gap-px">
              {row.map((val, ci) => {
                const isAnomaly = val > 0.85;
                return (
                  <div
                    key={ci}
                    className="flex-1 h-2 rounded-[1px]"
                    style={{
                      backgroundColor: isAnomaly
                        ? `hsl(0 72% ${40 + val * 30}%)`
                        : `hsl(186 100% ${5 + val * 40}%)`,
                      opacity: 0.4 + val * 0.6,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-primary/60" /> Normal
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-danger/60" /> Anomaly Region
          </span>
        </div>
      </motion.div>

      {/* Anomaly Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-4 space-y-2"
      >
        <p className="text-xs text-muted-foreground font-mono">ANOMALY HEATMAP</p>
        <div className="grid grid-cols-20 gap-px">
          {Array.from({ length: 200 }).map((_, i) => {
            const v = Math.random();
            return (
              <div
                key={i}
                className="aspect-square rounded-[2px]"
                style={{
                  backgroundColor:
                    v > 0.8
                      ? `hsl(0 72% 55% / ${v})`
                      : v > 0.5
                      ? `hsl(38 92% 55% / ${v * 0.7})`
                      : `hsl(145 70% 45% / ${v * 0.5})`,
                }}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Artifact Probability Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-4 space-y-2"
      >
        <p className="text-xs text-muted-foreground font-mono">ARTIFACT PROBABILITY DISTRIBUTION</p>
        <div className="flex items-end gap-1 h-32">
          {Array.from({ length: 40 }).map((_, i) => {
            const h = Math.sin(i * 0.3) * 0.3 + Math.random() * 0.5 + 0.2;
            const isHigh = h > 0.7;
            return (
              <div
                key={i}
                className="flex-1 rounded-t-sm transition-all"
                style={{
                  height: `${h * 100}%`,
                  backgroundColor: isHigh
                    ? `hsl(0 72% 55% / 0.8)`
                    : `hsl(186 100% 50% / 0.4)`,
                }}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Result Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-3"
      >
        {scores.map((s) => (
          <div key={s.label} className={`glass-panel p-4 text-center ${s.high ? "glow-danger" : ""}`}>
            <p className={`text-2xl font-mono font-bold ${s.high ? "text-danger" : "text-foreground"}`}>
              {s.value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ForensicAnalysis;
