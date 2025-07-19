import type {
  Message,
  SentimentData,
  MessageLengthData,
  SummaryStats,
} from "../types/analytics";

export function calculateSummaryStats(messages: Message[]): SummaryStats {
  const totalMessages = messages.length;
  const averageLength =
    messages.reduce((sum, msg) => sum + msg.length, 0) / totalMessages;

  const sentimentCounts = messages.reduce((acc, msg) => {
    acc[msg.sentiment] = (acc[msg.sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalMessages,
    averageLength: Math.round(averageLength),
    sentimentBreakdown: {
      positive: sentimentCounts.positive || 0,
      neutral: sentimentCounts.neutral || 0,
      negative: sentimentCounts.negative || 0,
    },
  };
}

export function processSentimentData(messages: Message[]): SentimentData[] {
  const stats = calculateSummaryStats(messages);

  return [
    {
      name: "Positive",
      value: stats.sentimentBreakdown.positive,
      color: "#10b981",
    },
    {
      name: "Neutral",
      value: stats.sentimentBreakdown.neutral,
      color: "#6b7280",
    },
    {
      name: "Negative",
      value: stats.sentimentBreakdown.negative,
      color: "#ef4444",
    },
  ];
}

export function processMessageLengthData(
  messages: Message[]
): MessageLengthData[] {
  const userLengths = messages.reduce((acc, msg) => {
    if (!acc[msg.user]) {
      acc[msg.user] = { total: 0, count: 0 };
    }
    acc[msg.user].total += msg.length;
    acc[msg.user].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  return Object.entries(userLengths)
    .map(([user, data]) => ({
      user,
      length: Math.round(data.total / data.count),
    }))
    .sort((a, b) => b.length - a.length) // Sort by length descending
    .slice(0, 10); // Take only top 10 users
}

export function filterMessages(
  messages: Message[],
  searchTerm: string
): Message[] {
  if (!searchTerm) return messages;

  const lowercaseSearch = searchTerm.toLowerCase();
  return messages.filter(
    (msg) =>
      msg.text.toLowerCase().includes(lowercaseSearch) ||
      msg.user.toLowerCase().includes(lowercaseSearch) ||
      msg.sentiment.toLowerCase().includes(lowercaseSearch)
  );
}

export function formatSentimentPercentage(
  value: number,
  total: number
): string {
  if (total === 0) return "0%";
  return `${Math.round((value / total) * 100)}%`;
}
