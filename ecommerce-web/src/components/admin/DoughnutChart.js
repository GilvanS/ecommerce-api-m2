/*
================================================================================
ARQUIVO: src/components/admin/DoughnutChart.js (NOVO)
================================================================================
*/
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// É necessário registar os componentes do Chart.js que vamos utilizar
ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({ chartData }) => {
  const data = {
    labels: Object.keys(chartData),
    datasets: [
      {
        label: "# de Ações",
        data: Object.values(chartData),
        backgroundColor: [
          "rgba(0, 51, 160, 0.7)", // merqado-blue
          "rgba(242, 140, 40, 0.7)", // merqado-orange
          "rgba(169, 169, 169, 0.7)", // merqado-gray-medium
          "rgba(0, 34, 122, 0.7)", // merqado-blue-dark
          "rgba(255, 221, 193, 0.7)", // merqado-orange-light
          "rgba(50, 188, 173, 0.7)", // Cor complementar (verde-água)
        ],
        borderColor: [
          "rgba(0, 51, 160, 1)",
          "rgba(242, 140, 40, 1)",
          "rgba(169, 169, 169, 1)",
          "rgba(0, 34, 122, 1)",
          "rgba(255, 221, 193, 1)",
          "rgba(50, 188, 173, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribuição de Ações de Auditoria",
        font: {
          size: 16,
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};
