import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { StackedBarChartProps } from "../interfaces";
import { colorScheme } from "../utils";

export const StackedBarChart = ({ data, keys }: StackedBarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 30,
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {keys.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            stackId="a"
            fill={colorScheme[key]}
            className="cursor-pointer"
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};
