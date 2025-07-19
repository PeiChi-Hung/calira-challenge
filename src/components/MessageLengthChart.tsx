import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MessageLengthData } from "../types/analytics";

interface MessageLengthChartProps {
  data: MessageLengthData[];
}

const MessageLengthChart = ({ data }: MessageLengthChartProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg group">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></span>
          Average Message Length by User
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="user" 
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              label={{ value: 'Characters', angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <Tooltip 
              formatter={(value: number) => [`${value} characters`, "Average Length"]}
              labelFormatter={(label: string) => `User: ${label}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Bar 
              dataKey="length" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]}
              animationDuration={800}
              className="transition-opacity hover:opacity-80"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MessageLengthChart;