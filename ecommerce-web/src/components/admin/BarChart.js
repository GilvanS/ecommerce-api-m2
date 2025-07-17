/*
================================================================================
ARQUIVO: src/components/admin/BarChart.js (NOVO)
================================================================================
*/
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// É necessário registar os componentes do Chart.js que vamos utilizar
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = ({ chartData }) => {
  // Ordena as datas para exibição correta no eixo X
  const labels = Object.keys(chartData).sort();
  const dataValues = labels.map((label) => chartData[label]);

  const data = {
    labels,
    datasets: [
      {
        label: "Ações Registradas",
        data: dataValues,
        backgroundColor: "rgba(0, 51, 160, 0.6)", // merqado-blue com transparência
        borderColor: "rgba(0, 51, 160, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false, // Opcional: esconde a legenda se o título for suficiente
      },
      title: {
        display: true,
        text: "Atividade por Dia (Últimos 7 Dias)",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // Garante que o eixo Y só mostre números inteiros
          stepSize: 1,
        },
      },
    },
  };

  return <Bar options={options} data={data} />;
};
