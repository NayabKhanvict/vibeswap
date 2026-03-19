"use client";

import { motion } from "framer-motion";
import { ScanResult } from "@/lib/types";
import RadarChart from "./RadarChart";

interface AgentMiniCardProps {
  result: ScanResult;
  index: number;
  onClick?: () => void;
}

export default function AgentMiniCard({ result, index, onClick }: AgentMiniCardProps) {
  const { personality, vibe_archetype, vibe_color, vibe_emoji } = result;
  if (!personality) return null;

  const color = vibe_color || "#00D4AA";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={onClick}
      className="flex-shrink-0 w-64 cursor-pointer"
    >
      <div
        className="rounded-2xl overflow-hidden h-full transition-shadow duration-300"
        style={{
          background: `linear-gradient(160deg, ${color}12 0%, #111111 50%, ${color}08 100%)`,
          border: `1px solid ${color}25`,
          boxShadow: `0 0 20px ${color}08`,
        }}
      >
        {/* Top accent */}
        <div
          className="h-0.5 w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />

        <div className="p-5 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
              style={{ background: `${color}20` }}
            >
              {vibe_emoji}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-foreground truncate">
                {personality.display_name}
              </h4>
              <p className="text-xs text-muted font-mono truncate">
                @{personality.source_handle}
              </p>
            </div>
          </div>

          {/* Archetype */}
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{
              background: `${color}12`,
              color: color,
              border: `1px solid ${color}25`,
            }}
          >
            {vibe_archetype}
          </div>

          {/* Mini radar */}
          <div className="flex justify-center">
            <RadarChart traits={personality.traits} color={color} size={130} />
          </div>

          {/* Tone tags */}
          <div className="flex flex-wrap gap-1">
            {personality.tone_keywords.slice(0, 3).map((tone) => (
              <span
                key={tone}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                style={{
                  background: `${color}10`,
                  color: `${color}BB`,
                  border: `1px solid ${color}18`,
                }}
              >
                {tone}
              </span>
            ))}
          </div>

          {/* Tagline */}
          <p className="text-xs text-muted/70 italic line-clamp-2">
            &ldquo;{personality.tagline}&rdquo;
          </p>

          {/* Platform badge */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono gradient-text font-semibold">
              vibeswap.ai
            </span>
            <span className="text-[10px] text-muted/40 capitalize">
              {personality.source_platform}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
