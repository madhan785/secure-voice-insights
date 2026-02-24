import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, RotateCcw } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Phase = "idle" | "recording" | "processing" | "result";
type ResultType = "genuine" | "suspicious" | "synthetic";

const WaveformBar = ({ delay }: { delay: number }) => (
  <motion.div
    className="w-1 rounded-full bg-primary"
    animate={{ height: ["20%", "80%", "20%"] }}
    transition={{ duration: 0.8, repeat: Infinity, delay, ease: "easeInOut" }}
    style={{ minHeight: 4 }}
  />
);

// Dynamic scoring with slight variance for realism
const getResultData = (type: ResultType) => {
  const jitter = () => Math.floor(Math.random() * 6) - 3; // ±3 variance
  const data: Record<ResultType, { label: string; color: string; glow: string; confidence: number; risk: string; match: number }> = {
    genuine: { label: "🟢 Genuine Voice", color: "text-success", glow: "glow-success", confidence: Math.min(99, 94 + jitter()), risk: "Low", match: Math.min(99, 92 + jitter()) },
    suspicious: { label: "🟡 Suspicious (Possible Mimicry)", color: "text-warning", glow: "glow-warning", confidence: 64 + jitter(), risk: "Medium", match: 55 + jitter() },
    synthetic: { label: "🔴 Synthetic Voice Detected", color: "text-danger", glow: "glow-danger", confidence: Math.min(99, 90 + jitter()), risk: "High", match: Math.max(3, 10 + jitter()) },
  };
  return data[type];
};

const RealTimeDetection = () => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [timer, setTimer] = useState(0);
  const [result, setResult] = useState<ResultType>("genuine");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (phase === "recording") {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [phase]);

  const startRecording = () => {
    setPhase("recording");
    setTimer(0);
  };

  const stopRecording = useCallback(() => {
    setPhase("processing");
    // Weighted detection: 65% genuine, 20% suspicious, 15% synthetic
    const roll = Math.random();
    const chosen: ResultType = roll < 0.65 ? "genuine" : roll < 0.85 ? "suspicious" : "synthetic";
    setTimeout(() => {
      setResult(chosen);
      setPhase("result");
    }, 2500);
  }, []);

  const reset = () => setPhase("idle");

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const r = getResultData(result);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-xl font-bold text-foreground">Real-Time Voice Detection</h2>

      {/* Waveform */}
      <AnimatePresence mode="wait">
        {phase === "recording" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-panel p-6 flex items-end justify-center gap-1 h-32"
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <WaveformBar key={i} delay={i * 0.05} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timer + Controls */}
      <div className="glass-panel p-8 text-center space-y-6">
        {phase === "recording" && (
          <div className="space-y-4">
            <p className="text-4xl font-mono font-bold text-primary">{formatTime(timer)}</p>
            <button
              onClick={stopRecording}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-danger text-danger-foreground font-medium hover:bg-danger/90 transition-colors"
            >
              <Square className="w-4 h-4" /> Stop Recording
            </button>
          </div>
        )}

        {phase === "idle" && (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-pulse-glow glow-primary">
              <Mic className="w-8 h-8 text-primary" />
            </div>
            <button
              onClick={startRecording}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors glow-primary"
            >
              <Mic className="w-4 h-4" /> Start Recording
            </button>
          </div>
        )}

        {phase === "processing" && (
          <div className="space-y-4 py-4">
            <div className="w-12 h-12 mx-auto border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Analyzing voice patterns...</p>
          </div>
        )}
      </div>

      {/* Result */}
      <AnimatePresence>
        {phase === "result" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className={`glass-panel p-6 text-center ${r.glow}`}>
              <p className={`text-2xl font-bold ${r.color}`}>{r.label}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Confidence Score", value: `${r.confidence}%` },
                { label: "Risk Level", value: r.risk },
                { label: "Speaker Match", value: `${r.match}%` },
              ].map((m) => (
                <div key={m.label} className="glass-panel p-4 text-center">
                  <p className="text-xl font-mono font-bold text-foreground">{m.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
                </div>
              ))}
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="advanced" className="glass-panel border-border">
                <AccordionTrigger className="px-4 text-sm text-muted-foreground hover:text-foreground">
                  Advanced Analysis
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "MFCC Similarity", value: "0.87" },
                      { label: "Prosodic Deviation", value: "0.12" },
                      { label: "Behavioral Consistency", value: "0.91" },
                      { label: "Spectral Artifact Score", value: "0.04" },
                    ].map((m) => (
                      <div key={m.label} className="p-3 rounded-md bg-muted/50">
                        <p className="font-mono text-sm text-foreground">{m.value}</p>
                        <p className="text-xs text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <button
              onClick={reset}
              className="flex items-center gap-2 mx-auto text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> New Analysis
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RealTimeDetection;
