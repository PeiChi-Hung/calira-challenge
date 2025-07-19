import "./App.css";
import MessageLengthChart from "./components/MessageLengthChart";
import MessageTable from "./components/MessageTable";
import SentimentChart from "./components/SentimentChart";
import SummaryCards from "./components/SummaryCards";
import mockDataJson from "./data/mockData.json";
import { calculateSummaryStats, processSentimentData, processMessageLengthData } from "./lib/analytics";
import type { Message } from "./types/analytics";

function App() {
  const mockData: Message[] = mockDataJson as Message[];
  const summaryStats = calculateSummaryStats(mockData);
  const sentimentData = processSentimentData(mockData);
  const messageLengthData = processMessageLengthData(mockData);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📊 Team Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Insights from team communications and engagement
          </p>
        </div>
        <div className="space-y-6">
          <SummaryCards stats={summaryStats} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SentimentChart data={sentimentData} />
            <MessageLengthChart data={messageLengthData} />
          </div>
          <MessageTable data={mockData} />
        </div>
      </div>
    </div>
  );
}

export default App;
