"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUIZ_QUESTIONS } from "@/lib/mock-data";

interface PersonalityQuizProps {
  onComplete: (answers: Record<string, number | string[]>) => void;
}

export default function PersonalityQuiz({ onComplete }: PersonalityQuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string[]>>({});
  const question = QUIZ_QUESTIONS[currentQ];
  const total = QUIZ_QUESTIONS.length;
  const progress = ((currentQ) / total) * 100;

  const sliderValue = typeof answers[question.id] === "number"
    ? (answers[question.id] as number)
    : (question.type === "slider" ? question.default : 0);

  const multiValue = Array.isArray(answers[question.id])
    ? (answers[question.id] as string[])
    : [];

  const handleSlider = (val: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: val }));
  };

  const handleMultiToggle = (option: string) => {
    const current = multiValue;
    const updated = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    setAnswers((prev) => ({ ...prev, [question.id]: updated }));
  };

  const canProceed = question.type === "slider"
    ? true
    : multiValue.length > 0;

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ((prev) => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) setCurrentQ((prev) => prev - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg mx-auto space-y-8"
    >
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted">
          <span>Question {currentQ + 1} of {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-1 bg-card-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-dark to-accent-light rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-semibold text-foreground text-center">
            {question.question}
          </h3>

          {question.type === "slider" && (
            <div className="space-y-4">
              <input
                type="range"
                min={question.min}
                max={question.max}
                value={sliderValue}
                onChange={(e) => handleSlider(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-card-border accent-accent"
              />
              <div className="flex justify-between text-xs text-muted">
                <span>{question.minLabel}</span>
                <span className="text-accent font-bold text-lg">{sliderValue}</span>
                <span>{question.maxLabel}</span>
              </div>
            </div>
          )}

          {question.type === "multi" && (
            <div className="flex flex-wrap gap-2 justify-center">
              {question.options.map((option) => {
                const selected = multiValue.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleMultiToggle(option)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
                      ${selected
                        ? "bg-accent/20 text-accent-light glow-border"
                        : "glass text-muted hover:text-foreground"
                      }
                    `}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3">
        {currentQ > 0 && (
          <button
            onClick={handleBack}
            className="flex-1 py-3 rounded-xl glass text-sm font-medium text-muted hover:text-foreground transition-colors cursor-pointer"
          >
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-accent-dark via-accent to-accent-light text-background hover:shadow-[0_0_20px_rgba(0,212,170,0.2)]"
        >
          {currentQ < total - 1 ? "Next" : "Generate My Vibe ✨"}
        </button>
      </div>
    </motion.div>
  );
}
