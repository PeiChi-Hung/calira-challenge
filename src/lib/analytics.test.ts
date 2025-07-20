import { describe, it, expect } from 'vitest';
import {
  calculateSummaryStats,
  processSentimentData,
  processMessageLengthData,
  filterMessages,
  formatSentimentPercentage,
} from './analytics';
import type { Message } from '../types/analytics';

// Test data with multiple entries per user
const testMessages: Message[] = [
  {
    id: "1",
    user: "user_01",
    text: "Great work team!",
    sentiment: "positive",
    length: 16
  },
  {
    id: "2",
    user: "user_01",
    text: "Having some database issues today.",
    sentiment: "negative",
    length: 34
  },
  {
    id: "3",
    user: "user_01",
    text: "Code review completed successfully.",
    sentiment: "positive",
    length: 34
  },
  {
    id: "4",
    user: "user_02",
    text: "Meeting at 3 PM.",
    sentiment: "neutral",
    length: 16
  },
  {
    id: "5",
    user: "user_02",
    text: "Excellent frontend progress!",
    sentiment: "positive",
    length: 28
  },
  {
    id: "6",
    user: "user_03",
    text: "Feeling overwhelmed with workload.",
    sentiment: "negative",
    length: 34
  }
];

describe('Analytics Utility Functions', () => {
  describe('calculateSummaryStats', () => {
    it('should calculate correct summary stats with multiple entries per user', () => {
      const stats = calculateSummaryStats(testMessages);
      
      expect(stats.totalMessages).toBe(6);
      expect(stats.averageLength).toBe(27); // (16+34+34+16+28+34)/6 = 162/6 = 27
      expect(stats.sentimentBreakdown).toEqual({
        positive: 3,
        neutral: 1,
        negative: 2
      });
    });

    it('should handle empty message array', () => {
      const stats = calculateSummaryStats([]);
      
      expect(stats.totalMessages).toBe(0);
      expect(stats.averageLength).toBe(0);
      expect(stats.sentimentBreakdown).toEqual({
        positive: 0,
        neutral: 0,
        negative: 0
      });
    });
  });

  describe('processSentimentData', () => {
    it('should return correct sentiment data with proper colors', () => {
      const sentimentData = processSentimentData(testMessages);
      
      expect(sentimentData).toHaveLength(3);
      expect(sentimentData[0]).toEqual({
        name: "Positive",
        value: 3,
        color: "#10b981"
      });
      expect(sentimentData[1]).toEqual({
        name: "Neutral", 
        value: 1,
        color: "#6b7280"
      });
      expect(sentimentData[2]).toEqual({
        name: "Negative",
        value: 2,
        color: "#ef4444"
      });
    });
  });

  describe('processMessageLengthData', () => {
    it('should calculate average message length per user correctly', () => {
      const lengthData = processMessageLengthData(testMessages);
      
      // user_01: (16+34+34)/3 = 84/3 = 28
      // user_02: (16+28)/2 = 44/2 = 22  
      // user_03: 34/1 = 34
      
      expect(lengthData).toHaveLength(3);
      
      // Should be sorted by length descending
      expect(lengthData[0]).toEqual({
        user: "user_03",
        length: 34
      });
      expect(lengthData[1]).toEqual({
        user: "user_01", 
        length: 28
      });
      expect(lengthData[2]).toEqual({
        user: "user_02",
        length: 22
      });
    });

    it('should limit results to top 10 users', () => {
      // Create test data with 15 users
      const manyUsers: Message[] = Array.from({ length: 15 }, (_, i) => ({
        id: `${i + 1}`,
        user: `user_${String(i + 1).padStart(2, '0')}`,
        text: `Message ${i + 1}`,
        sentiment: "neutral" as const,
        length: 20 + i
      }));

      const lengthData = processMessageLengthData(manyUsers);
      expect(lengthData).toHaveLength(10);
    });
  });

  describe('filterMessages', () => {
    it('should filter messages by text content', () => {
      const filtered = filterMessages(testMessages, 'database');
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe("2");
    });

    it('should filter messages by user', () => {
      const filtered = filterMessages(testMessages, 'user_01');
      expect(filtered).toHaveLength(3);
      expect(filtered.every(msg => msg.user === 'user_01')).toBe(true);
    });

    it('should filter messages by sentiment', () => {
      const filtered = filterMessages(testMessages, 'positive');
      expect(filtered).toHaveLength(3);
      expect(filtered.every(msg => msg.sentiment === 'positive')).toBe(true);
    });

    it('should be case insensitive', () => {
      const filtered = filterMessages(testMessages, 'USER_01');
      expect(filtered).toHaveLength(3);
    });

    it('should return all messages when search term is empty', () => {
      const filtered = filterMessages(testMessages, '');
      expect(filtered).toHaveLength(6);
    });
  });

  describe('formatSentimentPercentage', () => {
    it('should calculate correct percentages', () => {
      expect(formatSentimentPercentage(3, 6)).toBe('50%');
      expect(formatSentimentPercentage(1, 6)).toBe('17%');
      expect(formatSentimentPercentage(2, 6)).toBe('33%');
    });

    it('should handle zero total', () => {
      expect(formatSentimentPercentage(5, 0)).toBe('0%');
    });

    it('should round percentages correctly', () => {
      expect(formatSentimentPercentage(1, 3)).toBe('33%'); // 33.33% -> 33%
      expect(formatSentimentPercentage(2, 3)).toBe('67%'); // 66.67% -> 67%
    });
  });

  describe('Integration test with actual mock data structure', () => {
    it('should handle users with multiple messages correctly', () => {
      const multiUserMessages: Message[] = [
        {
          id: "1",
          user: "user_01",
          text: "Great work team, we nailed the deadline!",
          sentiment: "positive",
          length: 38
        },
        {
          id: "26", 
          user: "user_01",
          text: "Just finished the code review - looks solid!",
          sentiment: "positive",
          length: 43
        },
        {
          id: "27",
          user: "user_01",
          text: "Running into some issues with the database connection.",
          sentiment: "negative", 
          length: 54
        }
      ];

      const stats = calculateSummaryStats(multiUserMessages);
      const lengthData = processMessageLengthData(multiUserMessages);

      expect(stats.totalMessages).toBe(3);
      expect(stats.sentimentBreakdown.positive).toBe(2);
      expect(stats.sentimentBreakdown.negative).toBe(1);
      
      // user_01 average: (38+43+54)/3 = 135/3 = 45
      expect(lengthData[0]).toEqual({
        user: "user_01",
        length: 45
      });
    });
  });
});