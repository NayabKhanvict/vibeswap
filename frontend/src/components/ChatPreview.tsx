"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "@/lib/types";
import { SAMPLE_PROMPTS, MOCK_CHAT_RESPONSES } from "@/lib/mock-data";

interface ChatPreviewProps {
  archetype: string;
  agentName: string;
  vibeColor: string;
  vibeEmoji: string;
}

export default function ChatPreview({
  archetype,
  agentName,
  vibeColor,
  vibeEmoji,
}: ChatPreviewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const getResponse = (userMsg: string): string => {
    const responses = MOCK_CHAT_RESPONSES[archetype] || MOCK_CHAT_RESPONSES["The Visionary Creator"];
    return responses[userMsg] || responses["default"] || "That's interesting — tell me more.";
  };

  const handleSend = (msg?: string) => {
    const text = msg || input.trim();
    if (!text || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(text);
      setMessages((prev) => [...prev, { role: "agent", content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-md mx-auto"
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#0A0A0A",
          border: `1px solid ${vibeColor}20`,
          boxShadow: `0 0 30px ${vibeColor}08`,
        }}
      >
        {/* Chat header */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderBottom: `1px solid ${vibeColor}15` }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
            style={{ background: `${vibeColor}20` }}
          >
            {vibeEmoji}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{agentName}</p>
            <p className="text-[10px] text-muted font-mono">{archetype}</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: vibeColor }}
            />
            <span className="text-[10px] text-muted">Live Preview</span>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="h-64 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: "none" }}>
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <p className="text-sm text-muted/50 text-center">
                Test your agent&apos;s personality.<br />
                Try a prompt below or type your own.
              </p>
            </div>
          )}

          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-white/10 text-foreground rounded-br-sm"
                      : "rounded-bl-sm"
                  }`}
                  style={
                    msg.role === "agent"
                      ? { background: `${vibeColor}12`, color: "#e5e5e5" }
                      : undefined
                  }
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div
                className="px-4 py-3 rounded-2xl rounded-bl-sm text-sm"
                style={{ background: `${vibeColor}12` }}
              >
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: vibeColor, animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: vibeColor, animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: vibeColor, animationDelay: "300ms" }} />
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sample prompts */}
        {messages.length === 0 && (
          <div className="px-4 pb-2">
            <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {SAMPLE_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium glass text-muted hover:text-foreground transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-4 pb-4 pt-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent/30 transition-colors"
              disabled={isTyping}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: vibeColor, color: "#050505" }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
