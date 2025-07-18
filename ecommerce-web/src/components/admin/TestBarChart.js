import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export const TestBarChart = ({ chartData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && chartData) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(chartData),
          datasets: [
            {
              label: "Número de Falhas",
              data: Object.values(chartData),
              backgroundColor: "rgba(220, 53, 69, 0.6)", // Vermelho para falhas
              borderColor: "rgba(220, 53, 69, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                // Garante que o eixo Y só tenha números inteiros
                stepSize: 1,
              },
            },
          },
          responsive: true,
          plugins: {
            legend: {
              display: false, // Pode ocultar a legenda para um gráfico de uma só barra
            },
          },
        },
      });
    }
  }, [chartData]);

  return <canvas ref={chartRef} />;
};
