import React from "react";
import { Doughnut } from "react-chartjs-2";
import "../App.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);


function Chart({ expenses }) {
  const grouped = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(grouped),
    datasets: [
      {
        data: Object.values(grouped),
       backgroundColor: [
            "#ff6384", // pink
            "#36a2eb", // blue
            "#cc65fe", // purple
            "#ffce56", // yellow
            "#2ecc71", // green
            "#e74c3c", // red
            "#3498db", // sky blue
            "#9b59b6", // violet
            "#f1c40f", // gold
            "#34495e"  // dark slate
      ]

      }
    ]
  };

 return (
  <div className="chart-container">
    <Doughnut data={data} />
  </div>
);
}




export default Chart;