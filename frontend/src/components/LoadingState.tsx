"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const STEPS = [
  { label: "Finding your profile", icon: "🔍", duration: 1500 },
  { label: "Reading your posts", icon: "📖", duration: 2000 },
  { label: "Analyzing your vibe", icon: "🧠", duration: 2000 },
  { label: "Generating personality", icon: "✨", duration: 1500 },
  { label: "Building your card", icon: "🎨", duration: 1000 },
];

interface LoadingStateProps {
  onComplete: () => void;
}

export default function LoadingState({ onComplete }: LoadingStateProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStep >= STEPS.length) {
      onComplete();
      return;
    }

    const stepDuration = STEPS[currentStep].duration;
    const progressPerStep = 100 / STEPS.length;
    const startProgress = currentStep * progressPerStep;
    const endProgress = (currentStep + 1) * progressPerStep;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (endProgress - startProgress) / (stepDuration / 50);
        return Math.min(next, endProgress);
      });
    }, 50);

    const timeout = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, stepDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [currentStep, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto text-center space-y-8"
    >
      {/* Scanning animation circle */}
      <div className="relative w-40 h-40 mx-auto">
        <div className="absolute inset-0 rounded-full border-2 border-accent/20" />
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="76"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${progress * 4.78} 478`}
            className="transition-all duration-300"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00A88A" />
              <stop offset="100%" stopColor="#00FFD0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentStep < STEPS.length && (
              <motion.span
                key={currentStep}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-4xl"
              >
                {STEPS[currentStep].icon}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        {currentStep < STEPS.length && (
          <motion.p
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-lg text-muted font-medium"
          >
            {STEPS[currentStep].label}...
          </motion.p>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="w-full h-1 bg-card-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-dark to-accent-light rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <p className="text-sm text-muted/60">{Math.round(progress)}%</p>
    </motion.div>
  );
}
