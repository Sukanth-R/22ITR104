// components/StockChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function StockChart({ data }) {
  const avg = data.reduce((acc, d) => acc + d.price, 0) / data.length;

  const chartData = {
    labels: data.map((d) => new Date(d.lastUpdatedAt).toLocaleTimeString()),
    datasets: [
      {
        label: "Price",
        data: data.map((d) => d.price),
        borderColor: "#3f51b5",
        tension: 0.3,
        pointRadius: 3,
      },
      {
        label: "Average",
        data: Array(data.length).fill(avg),
        borderColor: "#f50057",
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          tooltip: {
            mode: "index",
          },
        },
      }}
    />
  );
}
