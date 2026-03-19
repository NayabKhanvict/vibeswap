"use client";

import { useState } from "react";
import { Platform } from "@/lib/types";
import { motion } from "framer-motion";

const platforms: { id: Platform; label: string; icon: string }[] = [
  { id: "instagram", label: "Instagram", icon: "📸" },
  { id: "tiktok", label: "TikTok", icon: "🎵" },
  { id: "twitter", label: "X / Twitter", icon: "𝕏" },
];

interface ScanFormProps {
  onSubmit: (handle: string, platform: Platform) => void;
  isLoading: boolean;
}

export default function ScanForm({ onSubmit, isLoading }: ScanFormProps) {
  const [handle, setHandle] = useState("");
  const [platform, setPlatform] = useState<Platform>("instagram");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handle.trim()) {
      onSubmit(handle.replace("@", ""), platform);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-lg mx-auto space-y-6"
    >
      {/* Platform Selector */}
      <div className="flex gap-2 justify-center">
        {platforms.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPlatform(p.id)}
            className={`
              px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer
              ${
                platform === p.id
                  ? "bg-accent/20 text-accent-light glow-border"
                  : "glass text-muted hover:text-foreground hover:border-white/20"
              }
            `}
          >
            <span className="mr-1.5">{p.icon}</span>
            {p.label}
          </button>
        ))}
      </div>

      {/* Handle Input */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-lg">
          @
        </span>
        <input
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="yourhandle"
          className="w-full pl-10 pr-4 py-4 rounded-2xl bg-card-bg border border-card-border text-foreground text-lg placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:shadow-[0_0_20px_rgba(0,212,170,0.1)] transition-all duration-300"
          disabled={isLoading}
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={!handle.trim() || isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-accent-dark via-accent to-accent-light text-background hover:shadow-[0_0_30px_rgba(0,212,170,0.3)]"
      >
        {isLoading ? "Scanning..." : "Scan My Vibe ✨"}
      </motion.button>
    </motion.form>
  );
}
