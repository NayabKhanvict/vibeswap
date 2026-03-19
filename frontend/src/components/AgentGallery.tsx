"use client";

import { motion } from "framer-motion";
import { ScanResult } from "@/lib/types";
import AgentMiniCard from "./AgentMiniCard";

interface AgentGalleryProps {
  agents: ScanResult[];
  onSelect?: (agent: ScanResult) => void;
}

export default function AgentGallery({ agents, onSelect }: AgentGalleryProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="w-full space-y-6"
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground">
          Recent Vibes
        </h3>
        <p className="text-sm text-muted mt-1">
          See what other agents sound like
        </p>
      </div>

      {/* Scrollable row */}
      <div className="relative -mx-6">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {agents.map((agent, i) => (
            <AgentMiniCard
              key={agent.scan_id}
              result={agent}
              index={i}
              onClick={() => onSelect?.(agent)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
