import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import Dashboard from "./pages/Dashboard";
import RealTimeDetection from "./pages/RealTimeDetection";
import SpeakerVerification from "./pages/SpeakerVerification";
import ContinuousMonitoring from "./pages/ContinuousMonitoring";
import ForensicAnalysis from "./pages/ForensicAnalysis";
import HistoryLogs from "./pages/HistoryLogs";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/detection" element={<RealTimeDetection />} />
            <Route path="/verification" element={<SpeakerVerification />} />
            <Route path="/monitoring" element={<ContinuousMonitoring />} />
            <Route path="/forensics" element={<ForensicAnalysis />} />
            <Route path="/history" element={<HistoryLogs />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
