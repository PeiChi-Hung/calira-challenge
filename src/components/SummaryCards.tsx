import { BarChart3, MessageCircle, TrendingUp } from "lucide-react";
import { formatSentimentPercentage } from "../lib/analytics";
import type { SummaryStats } from "../types/analytics";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface SummaryCardsProps {
  stats: SummaryStats;
}

const SummaryCards = ({ stats }: SummaryCardsProps) => {
  const totalMessages = stats.totalMessages;
  const positivePercentage = formatSentimentPercentage(
    stats.sentimentBreakdown.positive,
    totalMessages
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
          <MessageCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalMessages}</div>
          <p className="text-xs text-muted-foreground">
            Team communication activity
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Length</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averageLength}</div>
          <p className="text-xs text-muted-foreground">
            Characters per message
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Sentiment Overview
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {positivePercentage}
          </div>
          <p className="text-xs text-muted-foreground">
            Positive sentiment messages
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
