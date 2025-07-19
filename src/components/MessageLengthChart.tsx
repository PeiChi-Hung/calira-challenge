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
    <Card>
      <CardHeader>
        <CardTitle>Average Message Length by User</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="user" 
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis label={{ value: 'Characters', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              formatter={(value: number) => [`${value} characters`, "Average Length"]}
              labelFormatter={(label: string) => `User: ${label}`}
            />
            <Bar dataKey="length" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MessageLengthChart;