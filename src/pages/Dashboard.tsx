import { motion } from "framer-motion";
import { Mic, Upload, Phone, Shield, AlertTriangle, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Scans Today", value: "1,247", icon: Shield, color: "text-primary" },
  { label: "Threats Detected", value: "23", icon: AlertTriangle, color: "text-warning" },
  { label: "Active Sessions", value: "8", icon: Activity, color: "text-success" },
];

const Dashboard = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-5 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-panel p-8 text-center relative overflow-hidden"
      >
        {/* Scan line effect */}
        <div className="absolute inset-0 scan-line pointer-events-none" />

        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center glow-primary">
            <Mic className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Start Voice Verification
          </h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
            Analyze voice samples for synthetic speech patterns, deepfake artifacts, and speaker identity verification.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <Link
              to="/detection"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors glow-primary"
            >
              <Mic className="w-4 h-4" />
              Record Live Voice
            </Link>
            <Link
              to="/detection?mode=upload"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors border border-border"
            >
              <Upload className="w-4 h-4" />
              Upload Audio File
            </Link>
            <Link
              to="/detection?mode=call"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors border border-border"
            >
              <Phone className="w-4 h-4" />
              Live Call Mode
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            ⚠ User consent required before analysis.
          </p>
        </div>
      </motion.div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Speaker Verify", to: "/verification", icon: "🧠" },
          { label: "Forensic Mode", to: "/forensics", icon: "🔬" },
          { label: "Live Monitor", to: "/monitoring", icon: "📊" },
          { label: "History", to: "/history", icon: "📋" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.05 }}
          >
            <Link
              to={item.to}
              className="glass-panel p-4 flex flex-col items-center gap-2 hover:bg-primary/5 transition-colors group"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                {item.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
