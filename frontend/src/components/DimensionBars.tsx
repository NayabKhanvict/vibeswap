"use client";

import { AnalysisDimensions } from "@/lib/types";

interface DimensionBarsProps {
  dimensions: AnalysisDimensions;
  color?: string;
}

const DIMENSION_LABELS: { key: keyof AnalysisDimensions; label: string; emoji: string }[] = [
  { key: "formality", label: "Formality", emoji: "👔" },
  { key: "verbosity", label: "Verbosity", emoji: "💬" },
  { key: "humor", label: "Humor", emoji: "😄" },
  { key: "empathy", label: "Empathy", emoji: "💛" },
  { key: "assertiveness", label: "Assertive", emoji: "💪" },
  { key: "creativity", label: "Creative", emoji: "🎨" },
];

export default function DimensionBars({ dimensions, color = "#00D4AA" }: DimensionBarsProps) {
  return (
    <div className="space-y-2">
      {DIMENSION_LABELS.map(({ key, label, emoji }) => {
        const value = dimensions[key];
        const pct = (value / 10) * 100;
        return (
          <div key={key} className="flex items-center gap-2">
            <span className="text-xs w-5 text-center">{emoji}</span>
            <span className="text-[10px] text-muted w-16 truncate">{label}</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${pct}%`,
                  background: `linear-gradient(90deg, ${color}80, ${color})`,
                }}
              />
            </div>
            <span className="text-[10px] text-muted/60 w-4 text-right">{value}</span>
          </div>
        );
      })}
    </div>
  );
}
