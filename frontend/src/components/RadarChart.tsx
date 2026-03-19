"use client";

import { PersonalityTraits } from "@/lib/types";

interface RadarChartProps {
  traits: PersonalityTraits;
  color?: string;
  size?: number;
}

export default function RadarChart({
  traits,
  color = "#00D4AA",
  size = 200,
}: RadarChartProps) {
  const labels = [
    { key: "openness", label: "Open" },
    { key: "conscientiousness", label: "Focused" },
    { key: "extraversion", label: "Social" },
    { key: "agreeableness", label: "Warm" },
    { key: "neuroticism", label: "Intense" },
  ] as const;

  const center = size / 2;
  const radius = size * 0.38;
  const angleStep = (2 * Math.PI) / 5;
  const startAngle = -Math.PI / 2;

  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep;
    return {
      x: center + radius * value * Math.cos(angle),
      y: center + radius * value * Math.sin(angle),
    };
  };

  const dataPoints = labels.map((l, i) =>
    getPoint(i, traits[l.key])
  );
  const polygonPoints = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid */}
      {gridLevels.map((level) => {
        const points = labels
          .map((_, i) => {
            const p = getPoint(i, level);
            return `${p.x},${p.y}`;
          })
          .join(" ");
        return (
          <polygon
            key={level}
            points={points}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis lines */}
      {labels.map((_, i) => {
        const p = getPoint(i, 1);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={polygonPoints}
        fill={`${color}20`}
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill={color} />
      ))}

      {/* Labels */}
      {labels.map((l, i) => {
        const p = getPoint(i, 1.25);
        return (
          <text
            key={l.key}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize="11"
            fontFamily="var(--font-sans), system-ui, sans-serif"
          >
            {l.label}
          </text>
        );
      })}
    </svg>
  );
}
