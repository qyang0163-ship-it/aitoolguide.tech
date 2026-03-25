// Tool data with i18n keys - NO hardcoded Chinese
// All display text uses translation keys
// 
// TIER STRATEGY:
// - tier1 (commission): Notion, Runway, Gamma, Perplexity → /go/xxx + partner badge
// - tier2 (private): ChatGPT, Midjourney, Claude, Copilot, DALL-E 3, Claude Code → /sign-in

export const toolData = [
  // ========== TIER 2: Private Domain (Auth Required) ==========
  {
    id: "chatgpt",
    name: "ChatGPT",
    icon: "💬",
    color: "#10a37f",
    url: "/sign-in",
    externalUrl: "https://chat.openai.com",
    incomeRange: { min: 3000, max: 8000 },
    difficulty: 2,
    category: "writing",
    tier: "private",
    ctaKey: "unlockGuide",
    ctaDefault: "🔥 Unlock Earning Guide"
  },
  {
    id: "midjourney",
    name: "Midjourney",
    icon: "🎨",
    color: "#6366f1",
    url: "/sign-in",
    externalUrl: "https://www.midjourney.com",
    incomeRange: { min: 5000, max: 15000 },
    difficulty: 3,
    category: "art",
    tier: "private",
    ctaKey: "unlockGuide",
    ctaDefault: "🔥 Unlock Earning Guide"
  },
  {
    id: "claude",
    name: "Claude",
    icon: "🧠",
    color: "#d97706",
    url: "/sign-in",
    externalUrl: "https://claude.ai",
    incomeRange: { min: 4000, max: 10000 },
    difficulty: 2,
    category: "writing",
    tier: "private",
    ctaKey: "unlockGuide",
    ctaDefault: "🔥 Unlock Earning Guide"
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    icon: "💻",
    color: "#6b7280",
    url: "/sign-in",
    externalUrl: "https://github.com/features/copilot",
    incomeRange: { min: 8000, max: 30000 },
    difficulty: 4,
    category: "code",
    tier: "private",
    ctaKey: "unlockGuide",
    ctaDefault: "🔥 Unlock Earning Guide"
  },
  {
    id: "dalle3",
    name: "DALL-E 3",
    icon: "🖼️",
    color: "#8b5cf6",
    url: "/sign-in",
    externalUrl: "https://openai.com/dall-e-3",
    incomeRange: { min: 3000, max: 8000 },
    difficulty: 2,
    category: "art",
    tier: "private",
    ctaKey: "unlockGuide",
    ctaDefault: "🔥 Unlock Earning Guide"
  },
  {
    id: "claude-code",
    name: "Claude Code",
    icon: "⚡",
    color: "#dc2626",
    url: "/sign-in",
    externalUrl: "https://claude.ai/claude-code",
    incomeRange: { min: 10000, max: 50000 },
    difficulty: 4,
    category: "code",
    tier: "private",
    ctaKey: "unlockGuide",
    ctaDefault: "🔥 Unlock Earning Guide"
  },
  // ========== TIER 1: Commission (Direct Affiliate) ==========
  {
    id: "notion",
    name: "Notion AI",
    icon: "📝",
    color: "#000000",
    url: "/go/notion",
    incomeRange: { min: 2000, max: 6000 },
    difficulty: 1,
    category: "productivity",
    tier: "commission",
    ctaKey: "tryFree",
    ctaDefault: "🚀 Try Free Now",
    partner: true
  },
  {
    id: "runway",
    name: "Runway",
    icon: "🎬",
    color: "#ec4899",
    url: "/go/runway",
    incomeRange: { min: 6000, max: 20000 },
    difficulty: 3,
    category: "video",
    tier: "commission",
    ctaKey: "tryFree",
    ctaDefault: "🚀 Try Free Now",
    partner: true
  },
  {
    id: "gamma",
    name: "Gamma",
    icon: "📊",
    color: "#f59e0b",
    url: "/go/gamma",
    incomeRange: { min: 3000, max: 10000 },
    difficulty: 1,
    category: "productivity",
    tier: "commission",
    ctaKey: "tryFree",
    ctaDefault: "🚀 Try Free Now",
    partner: true
  },
  {
    id: "perplexity",
    name: "Perplexity",
    icon: "🔍",
    color: "#10b981",
    url: "/go/perplexity",
    incomeRange: { min: 2000, max: 5000 },
    difficulty: 1,
    category: "research",
    tier: "commission",
    ctaKey: "tryFree",
    ctaDefault: "🚀 Try Free Now",
    partner: true
  }
];

// Category mapping with i18n keys
export const categoryMap = {
  writing: { key: "catWriting", default: "AI Writing" },
  art: { key: "catArt", default: "AI Art" },
  video: { key: "catVideo", default: "Video Editing" },
  code: { key: "catCode", default: "Code & Tech" },
  productivity: { key: "catProductivity", default: "Productivity" },
  research: { key: "catResearch", default: "Research" }
};

// Currency configuration by locale
export const currencyConfig = {
  "zh-CN": { symbol: "￥", rate: 1, suffix: "/月" },
  "zh-TW": { symbol: "NT$", rate: 4.5, suffix: "/月" },
  "en": { symbol: "$", rate: 0.14, suffix: "/month" },
  "es": { symbol: "€", rate: 0.13, suffix: "/mes" },
  "ja": { symbol: "¥", rate: 21, suffix: "/月" },
  "pt": { symbol: "R$", rate: 0.72, suffix: "/mês" },
  "vi": { symbol: "₫", rate: 3500, suffix: "/tháng" },
  "th": { symbol: "฿", rate: 5, suffix: "/เดือน" },
  "id": { symbol: "Rp", rate: 2200, suffix: "/bulan" },
  "hi": { symbol: "₹", rate: 12, suffix: "/महीना" },
  "de": { symbol: "€", rate: 0.13, suffix: "/Monat" },
  "fr": { symbol: "€", rate: 0.13, suffix: "/mois" },
  "ko": { symbol: "₩", rate: 190, suffix: "/월" },
  "ar": { symbol: "د.إ", rate: 0.52, suffix: "/شهر" },
  "ru": { symbol: "₽", rate: 13, suffix: "/мес" },
  "tr": { symbol: "₺", rate: 4.8, suffix: "/ay" }
};

// Format income based on locale
export function formatIncome(min, max, locale = "en") {
  const config = currencyConfig[locale] || currencyConfig["en"];
  const minLocal = Math.round(min * config.rate);
  const maxLocal = Math.round(max * config.rate);
  return `${config.symbol}${minLocal.toLocaleString()}-${maxLocal.toLocaleString()}${config.suffix}`;
}

// Get difficulty stars
export function getDifficultyStars(level) {
  return "⭐".repeat(level);
}
