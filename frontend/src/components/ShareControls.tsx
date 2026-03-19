"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ShareControlsProps {
  scanId: string;
}

export default function ShareControls({ scanId }: ShareControlsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/scan/${scanId}`
      : "";

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadConfig = () => {
    // In real app, this would download the agent config JSON
    alert("Agent config download will be available in the full version!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mx-auto"
    >
      <button
        onClick={handleCopyLink}
        className="flex-1 py-3 px-5 rounded-xl glass text-sm font-medium text-foreground hover:border-accent/30 transition-all cursor-pointer"
      >
        {copied ? "Copied! ✓" : "Copy Link 🔗"}
      </button>

      <button
        onClick={handleDownloadConfig}
        className="flex-1 py-3 px-5 rounded-xl text-sm font-medium transition-all cursor-pointer bg-gradient-to-r from-accent-dark to-accent text-background hover:shadow-[0_0_20px_rgba(0,212,170,0.2)]"
      >
        Download Config ⬇
      </button>
    </motion.div>
  );
}
