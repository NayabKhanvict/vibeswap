"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScanForm from "@/components/ScanForm";
import LoadingState from "@/components/LoadingState";
import PersonalityCard from "@/components/PersonalityCard";
import ShareControls from "@/components/ShareControls";
import AgentGallery from "@/components/AgentGallery";
import PersonalityQuiz from "@/components/PersonalityQuiz";
import ChatPreview from "@/components/ChatPreview";
import { Platform, ScanResult } from "@/lib/types";
import { MOCK_RESULT, EXAMPLE_AGENTS } from "@/lib/mock-data";

type AppState = "idle" | "loading" | "done";
type EntryMode = "scan" | "quiz";

export default function Home() {
  const [state, setState] = useState<AppState>("idle");
  const [entryMode, setEntryMode] = useState<EntryMode>("scan");
  const [scannedHandle, setScannedHandle] = useState("");
  const [activeResult, setActiveResult] = useState<ScanResult>(MOCK_RESULT);

  const handleScan = (handle: string, _platform: Platform) => {
    setScannedHandle(handle);
    setActiveResult(MOCK_RESULT);
    setState("loading");
  };

  const handleScanComplete = () => {
    setState("done");
  };

  const handleQuizComplete = (_answers: Record<string, number | string[]>) => {
    setScannedHandle("you");
    setActiveResult(MOCK_RESULT);
    setState("loading");
  };

  const handleSelectAgent = (agent: ScanResult) => {
    setActiveResult(agent);
    setScannedHandle(agent.personality?.source_handle || "");
    setState("done");
  };

  const handleReset = () => {
    setState("idle");
    setScannedHandle("");
  };

  return (
    <div className="flex flex-col flex-1 items-center relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] animate-pulse-glow"
          style={{ background: "rgba(0, 212, 170, 0.08)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] animate-pulse-glow"
          style={{
            background: "rgba(0, 212, 170, 0.05)",
            animationDelay: "1s",
          }}
        />
      </div>

      <main className="relative z-10 w-full max-w-2xl mx-auto px-6 py-16 space-y-12">
        {/* Logo / Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="gradient-text">VibeSwap</span>
          </h1>
          <p className="text-muted text-sm font-mono mt-2 tracking-wider uppercase">
            The Agentic Identity Center
          </p>
        </motion.div>

        {/* Headline */}
        {state === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-center space-y-4"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground leading-tight">
              What does your AI agent
              <br />
              <span className="gradient-text">sound like?</span>
            </h2>
            <p className="text-muted text-base max-w-md mx-auto">
              Scan your social media or take the personality quiz to generate a
              custom AI agent identity in seconds.
            </p>
          </motion.div>
        )}

        {/* Entry Mode Toggle */}
        {state === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex justify-center"
          >
            <div className="glass rounded-full p-1 flex gap-1">
              <button
                onClick={() => setEntryMode("scan")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  entryMode === "scan"
                    ? "bg-accent/20 text-accent-light glow-border"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Vibe Scan
              </button>
              <button
                onClick={() => setEntryMode("quiz")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  entryMode === "quiz"
                    ? "bg-accent/20 text-accent-light glow-border"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Personality Quiz
              </button>
            </div>
          </motion.div>
        )}

        {/* Scan Form */}
        {state === "idle" && entryMode === "scan" && (
          <ScanForm onSubmit={handleScan} isLoading={false} />
        )}

        {/* Personality Quiz */}
        {state === "idle" && entryMode === "quiz" && (
          <PersonalityQuiz onComplete={handleQuizComplete} />
        )}

        {/* Loading State */}
        {state === "loading" && (
          <div className="space-y-4 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted text-sm font-mono"
            >
              {scannedHandle === "you"
                ? "Generating your vibe from quiz answers"
                : `Scanning @${scannedHandle}`}
            </motion.p>
            <LoadingState onComplete={handleScanComplete} />
          </div>
        )}

        {/* Result */}
        {state === "done" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-10"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">
                Your Vibe Card
              </h2>
              <p className="text-muted text-sm mt-1">
                @{scannedHandle}&apos;s AI personality
              </p>
            </div>

            <PersonalityCard result={activeResult} />

            {/* Live Chat Preview */}
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground">
                  Test Your Agent
                </h3>
                <p className="text-sm text-muted mt-1">
                  See how your AI agent responds in conversation
                </p>
              </div>
              <ChatPreview
                archetype={activeResult.vibe_archetype || "The Visionary Creator"}
                agentName={activeResult.personality?.display_name || "Agent"}
                vibeColor={activeResult.vibe_color || "#00D4AA"}
                vibeEmoji={activeResult.vibe_emoji || "🤖"}
              />
            </div>

            <ShareControls scanId={activeResult.scan_id} />

            <div className="text-center">
              <button
                onClick={handleReset}
                className="text-sm text-muted hover:text-accent transition-colors cursor-pointer"
              >
                ← Scan another profile
              </button>
            </div>
          </motion.div>
        )}

        {/* Agent Gallery — shown on idle with scan mode */}
        {state === "idle" && entryMode === "scan" && (
          <AgentGallery agents={EXAMPLE_AGENTS} onSelect={handleSelectAgent} />
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center pt-8"
        >
          <p className="text-xs text-muted/40 font-mono">
            Create. Manage. Deploy. Your AI agent&apos;s soul — everywhere.
          </p>
        </motion.footer>
      </main>
    </div>
  );
}
