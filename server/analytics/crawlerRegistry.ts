export interface AICrawlerDef {
  family: string;
  name: string;
  patterns: string[];
}

export const AI_CRAWLERS: AICrawlerDef[] = [
  // Tradicionales SEO / Buscadores
  {
    family: "Google",
    name: "Googlebot",
    patterns: ["Googlebot", "Google-InspectionTool"]
  },
  {
    family: "Microsoft",
    name: "Bingbot",
    patterns: ["bingbot", "BingPreview"]
  },
  {
    family: "Ahrefs",
    name: "AhrefsBot",
    patterns: ["AhrefsBot"]
  },
  {
    family: "Apple",
    name: "Applebot",
    patterns: ["Applebot"]
  },
  {
    family: "DuckDuckGo",
    name: "DuckDuckBot",
    patterns: ["DuckDuckBot"]
  },
  // IA y LLMs
  {
    family: "OpenAI",
    name: "GPTBot",
    patterns: ["GPTBot"]
  },
  {
    family: "OpenAI",
    name: "OAI-SearchBot",
    patterns: ["OAI-SearchBot"]
  },
  {
    family: "OpenAI",
    name: "ChatGPT-User",
    patterns: ["ChatGPT-User"]
  },
  {
    family: "Anthropic",
    name: "ClaudeBot",
    patterns: ["ClaudeBot"]
  },
  {
    family: "Perplexity",
    name: "PerplexityBot",
    patterns: ["PerplexityBot"]
  },
  {
    family: "Google",
    name: "Google-Extended",
    patterns: ["Google-Extended"]
  },
  {
    family: "Cohere",
    name: "Cohere-ai",
    patterns: ["cohere-ai"]
  },
  {
    family: "Meta",
    name: "Meta-ExternalAgent",
    patterns: ["Meta-ExternalAgent", "FacebookBot"]
  }
];

export function detectAICrawler(userAgent: string): { family: string, name: string, detectionMethod: string } | null {
  if (!userAgent) return null;
  const ua = userAgent.toLowerCase();
  
  for (const crawler of AI_CRAWLERS) {
    for (const pattern of crawler.patterns) {
      if (ua.includes(pattern.toLowerCase())) {
        return {
          family: crawler.family,
          name: crawler.name,
          detectionMethod: "user_agent"
        };
      }
    }
  }
  
  return null;
}
