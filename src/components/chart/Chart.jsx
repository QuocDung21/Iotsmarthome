import "./chart.scss";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  YAxis,
  Line,
  Legend,
} from "recharts";

const data = [
  {
    name: "Page A",
    nd: 3000,
    da: 2400,
  },
  {
    name: "Page B",
    nd: 3000,
    da: 1398,
  },
  {
    name: "Page C",
    nd: 2000,
    da: 9800,
  },
  {
    name: "Page D",
    nd: 2780,
    da: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    nd: 1890,
    da: 4800,
  },
  {
    name: "Page F",
    nd: 2390,
    da: 3800,
  },
  {
    name: "Page G",
    nd: 3490,
    da: 4300,
  },
];

const Chart = ({ aspect, title, da }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <LineChart
        width={430}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {/* <XAxis dataKey="name" /> */}
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="nd" stroke="#8884d8" />
        <Line type="monotone" dataKey="da" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default Chart;
