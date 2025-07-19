import "./App.css";
import { useState, useEffect } from "react";
import LoadingDashboard from "./components/LoadingDashboard";
import MessageLengthChart from "./components/MessageLengthChart";
import MessageTable from "./components/MessageTable";
import SentimentChart from "./components/SentimentChart";
import SummaryCards from "./components/SummaryCards";
import mockDataJson from "./data/mockData.json";
import { calculateSummaryStats, processSentimentData, processMessageLengthData } from "./lib/analytics";
import type { Message } from "./types/analytics";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  
  const mockData: Message[] = mockDataJson as Message[];
  const summaryStats = calculateSummaryStats(mockData);
  const sentimentData = processSentimentData(mockData);
  const messageLengthData = processMessageLengthData(mockData);

  useEffect(() => {
    // Simulate loading time for demo purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Add slight delay for smoother transition
      setTimeout(() => setIsVisible(true), 100);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingDashboard />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            📊 Team Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Insights from team communications and engagement
          </p>
        </div>
        <div className={`space-y-6 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}>
          <div className="animate-in slide-in-from-bottom-2 duration-500 delay-300">
            <SummaryCards stats={summaryStats} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-bottom-2 duration-500 delay-500">
            <SentimentChart data={sentimentData} />
            <MessageLengthChart data={messageLengthData} />
          </div>
          <div className="animate-in slide-in-from-bottom-2 duration-500 delay-700">
            <MessageTable data={mockData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
