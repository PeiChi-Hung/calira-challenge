import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import type { MessageLengthData } from "../types/analytics";

interface MessageLengthChartProps {
  data: MessageLengthData[];
}

const chartConfig = {
  length: {
    label: "Message Length",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

const MessageLengthChart = ({ data }: MessageLengthChartProps) => {
  // Calculate dynamic interval based on data length to avoid overcrowding
  const getXAxisInterval = (dataLength: number) => {
    if (dataLength <= 10) return 0; // Show all labels for small datasets
    if (dataLength <= 20) return 1; // Show every other label
    return Math.ceil(dataLength / 10) - 1; // Show ~10 labels for larger datasets
  };

  // Sort data by length for better visual hierarchy
  const sortedData = [...data].sort((a, b) => b.length - a.length);

  return (
    <Card className="transition-all duration-300 hover:shadow-lg group">
      <CardHeader>
        <CardTitle>
          Average Message Length by User
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Top performers by message length ({data.length} users)
        </p>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[350px] w-full"
        >
          <BarChart 
            data={sortedData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="user" 
              angle={-45}
              textAnchor="end"
              height={60}
              interval={getXAxisInterval(data.length)}
              tick={{ fontSize: 10, fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              label={{ value: 'Characters', angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
            <Bar 
              dataKey="length" 
              fill="var(--color-length)"
              radius={[4, 4, 0, 0]}
              animationDuration={800}
              className="transition-opacity hover:opacity-80"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MessageLengthChart;