import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background cyber-grid">
      <AppSidebar />
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 shrink-0">
          <div>
            <h1 className="text-sm font-semibold text-foreground">
              EchoTrace: A Real-Time AI Framework for Detecting Synthetic and Impersonated Human Speech
            </h1>
            <p className="text-xs text-muted-foreground">
              Real-Time Synthetic & Mimicry Voice Risk Analysis
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/settings" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/settings" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <button className="px-3 py-1.5 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
              Login
            </button>
          </div>
        </header>
        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
