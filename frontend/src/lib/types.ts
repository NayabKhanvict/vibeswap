export type Platform = "instagram" | "tiktok" | "twitter";

export interface PersonalityTraits {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface AnalysisDimensions {
  formality: number;       // 1-10 scale
  verbosity: number;       // 1-10 scale
  humor: number;           // 1-10 scale
  empathy: number;         // 1-10 scale
  assertiveness: number;   // 1-10 scale
  creativity: number;      // 1-10 scale
}

export interface AgentConfig {
  display_name: string;
  tagline: string;
  bio: string;
  traits: PersonalityTraits;
  dimensions: AnalysisDimensions;
  communication_style: string;
  tone_keywords: string[];
  topics_of_expertise: string[];
  vocabulary_quirks: string[];
  signature_phrases: string[];
  humor_style: string;
  jargon_patterns: string[];
  system_prompt: string;
  dos: string[];
  donts: string[];
  source_platform: Platform;
  source_handle: string;
  generated_at: string;
}

export interface ScanResult {
  scan_id: string;
  status: "processing" | "scraping" | "analyzing" | "done" | "error";
  progress: number;
  personality: AgentConfig | null;
  vibe_archetype: string | null;
  vibe_color: string | null;
  vibe_emoji: string | null;
  error?: string;
}

export interface QuizAnswer {
  questionId: string;
  value: number | string[];
}

export interface ChatMessage {
  role: "user" | "agent";
  content: string;
}
