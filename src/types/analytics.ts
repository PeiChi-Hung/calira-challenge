export interface Message {
  id: string;
  user: string;
  text: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  length: number;
}

export interface SentimentData {
  name: string;
  value: number;
  color: string;
}

export interface MessageLengthData {
  user: string;
  length: number;
}

export interface SummaryStats {
  totalMessages: number;
  averageLength: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
}