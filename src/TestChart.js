import {
  Chart as ChartJS,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar,Line } from "react-chartjs-2"
import React, { useState, useEffect } from "react";

import { Chart, registerables } from 'chart.js';

ChartJS.register(
  ...registerables
);

const up = (ctx, value) => ctx.p0.parsed.y < ctx.p1.parsed.y ? value : undefined
const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined


function TestChart({prices,dates}) {


  const priceData = prices
  const labels = dates

  console.table(priceData)

  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    setChartData({
      labels: labels,
      tension: 0.4,
      datasets: [
        {
          label: 'IBM',
          data: priceData,
          fill: true,
          borderColor:'rgba(255,0,0,0)',
          segment: {
            borderColor: ctx => down(ctx, 'rgb(255,0,0)') || 'rgb(0,255,50)' 
          },
        },
      ],
    });   
  }, [priceData]);


  return (
    <div className="TestChart">
      <Line data={chartData}></Line>
    </div>
  );
}

export default TestChart;
