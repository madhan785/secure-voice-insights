import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ContinuousMonitoring = () => {
  const [risk, setRisk] = useState(15);
  const [history, setHistory] = useState<number[]>([15]);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRisk((prev) => {
        // Bias toward low risk: mean-reverting toward 25% baseline
        const meanRevert = (25 - prev) * 0.08;
        const noise = (Math.random() - 0.5) * 14;
        const spike = Math.random() < 0.05 ? 30 : 0; // rare spikes
        const next = Math.max(0, Math.min(100, prev + meanRevert + noise + spike));
        setHistory((h) => [...h.slice(-29), next]);
        if (next > 70) setAlert(true);
        else setAlert(false);
        return Math.round(next);
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const riskColor = risk < 40 ? "text-success" : risk < 70 ? "text-warning" : "text-danger";
  const riskGlow = risk < 40 ? "glow-success" : risk < 70 ? "glow-warning" : "glow-danger";
  const riskLabel = risk < 40 ? "Low Risk" : risk < 70 ? "Medium Risk" : "High Risk";

  // Gauge angle: 0% = -90deg, 100% = 90deg
  const angle = -90 + (risk / 100) * 180;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-xl font-bold text-foreground">Continuous Monitoring</h2>

      {/* Alert */}
      {alert && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-4 border-danger/50 flex items-center gap-3 glow-danger"
        >
          <AlertTriangle className="w-5 h-5 text-danger animate-pulse" />
          <div>
            <p className="text-sm font-medium text-danger">⚠ High Risk Alert</p>
            <p className="text-xs text-muted-foreground">
              Voice risk level exceeds 70% threshold. Potential synthetic or mimicry voice detected.
            </p>
          </div>
        </motion.div>
      )}

      {/* Gauge */}
      <div className={`glass-panel p-8 text-center ${riskGlow}`}>
        <div className="relative w-48 h-24 mx-auto overflow-hidden mb-4">
          {/* Track */}
          <div
            className="absolute inset-0 rounded-t-full"
            style={{
              background: `conic-gradient(from 180deg at 50% 100%, hsl(145 70% 45%) 0deg, hsl(38 92% 55%) 60deg, hsl(0 72% 55%) 120deg, hsl(0 72% 55%) 180deg, transparent 180deg)`,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            }}
          />
          {/* Inner cutout */}
          <div className="absolute inset-3 rounded-t-full bg-card" />
          {/* Needle */}
          <div
            className="absolute bottom-0 left-1/2 w-0.5 h-20 bg-foreground origin-bottom transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
          />
          {/* Center dot */}
          <div className="absolute bottom-0 left-1/2 w-3 h-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-foreground" />
        </div>
        <p className={`text-5xl font-mono font-bold ${riskColor}`}>{risk}%</p>
        <p className="text-sm text-muted-foreground mt-1">{riskLabel}</p>
      </div>

      {/* Live Graph */}
      <div className="glass-panel p-4 space-y-2">
        <p className="text-xs text-muted-foreground font-mono">RISK TIMELINE</p>
        <div className="flex items-end gap-1 h-24">
          {history.map((val, i) => {
            const color =
              val < 40
                ? "hsl(145 70% 45%)"
                : val < 70
                ? "hsl(38 92% 55%)"
                : "hsl(0 72% 55%)";
            return (
              <motion.div
                key={i}
                className="flex-1 rounded-t-sm"
                initial={{ height: 0 }}
                animate={{ height: `${val}%` }}
                transition={{ duration: 0.3 }}
                style={{ backgroundColor: color }}
              />
            );
          })}
        </div>
      </div>

      {/* Status indicators */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-panel p-3 text-center">
          <div className="w-3 h-3 rounded-full bg-success mx-auto mb-2 animate-pulse" />
          <p className="text-xs text-muted-foreground">Stream Active</p>
        </div>
        <div className="glass-panel p-3 text-center">
          <p className="font-mono text-sm text-foreground">48kHz</p>
          <p className="text-xs text-muted-foreground">Sample Rate</p>
        </div>
        <div className="glass-panel p-3 text-center">
          <p className="font-mono text-sm text-foreground">12ms</p>
          <p className="text-xs text-muted-foreground">Latency</p>
        </div>
      </div>
    </div>
  );
};

export default ContinuousMonitoring;
