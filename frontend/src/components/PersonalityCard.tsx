"use client";

import { motion } from "framer-motion";
import { ScanResult } from "@/lib/types";
import RadarChart from "./RadarChart";
import DimensionBars from "./DimensionBars";
import { useRef } from "react";

interface PersonalityCardProps {
  result: ScanResult;
}

export default function PersonalityCard({ result }: PersonalityCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { personality, vibe_archetype, vibe_color, vibe_emoji } = result;
  if (!personality) return null;

  const color = vibe_color || "#00D4AA";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-sm mx-auto"
    >
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${color}12 0%, #111111 40%, #111111 60%, ${color}08 100%)`,
          border: `1px solid ${color}30`,
          boxShadow: `0 0 40px ${color}15, 0 20px 60px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Top accent line */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          }}
        />

        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-mono">
                @{personality.source_handle}
              </p>
              <h3 className="text-xl font-bold text-foreground mt-0.5">
                {personality.display_name}
              </h3>
            </div>
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: `${color}20` }}
            >
              {vibe_emoji}
            </div>
          </div>

          {/* Tagline */}
          <p
            className="text-sm font-medium italic"
            style={{ color: `${color}CC` }}
          >
            &ldquo;{personality.tagline}&rdquo;
          </p>

          {/* Archetype Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: `${color}15`,
              color: color,
              border: `1px solid ${color}30`,
            }}
          >
            <span>{vibe_emoji}</span>
            {vibe_archetype}
          </div>

          {/* Radar Chart */}
          <div className="flex justify-center py-2">
            <RadarChart
              traits={personality.traits}
              color={color}
              size={200}
            />
          </div>

          {/* Analysis Dimensions */}
          <div>
            <p className="text-xs text-muted uppercase tracking-wider mb-3">
              Personality Dimensions
            </p>
            <DimensionBars dimensions={personality.dimensions} color={color} />
          </div>

          {/* Tone & Topics */}
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted uppercase tracking-wider mb-2">
                Tone
              </p>
              <div className="flex flex-wrap gap-1.5">
                {personality.tone_keywords.map((tone) => (
                  <span
                    key={tone}
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: `${color}10`,
                      color: `${color}CC`,
                      border: `1px solid ${color}20`,
                    }}
                  >
                    {tone}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-muted uppercase tracking-wider mb-2">
                Expertise
              </p>
              <div className="flex flex-wrap gap-1.5">
                {personality.topics_of_expertise.map((topic) => (
                  <span
                    key={topic}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-muted border border-white/10"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quirks */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted uppercase tracking-wider">
              Quirks
            </p>
            {personality.vocabulary_quirks.map((quirk) => (
              <p
                key={quirk}
                className="text-xs text-muted/70 pl-3 border-l border-white/10"
              >
                {quirk}
              </p>
            ))}
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between pt-3 mt-3"
            style={{ borderTop: `1px solid ${color}15` }}
          >
            <span className="text-xs font-mono gradient-text font-semibold">
              vibeswap.ai
            </span>
            <span className="text-xs text-muted/40">
              {personality.source_platform}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
