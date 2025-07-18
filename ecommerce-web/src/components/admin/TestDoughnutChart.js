import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export const TestDoughnutChart = ({ chartData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && chartData) {
      // Destrói o gráfico anterior para evitar duplicatas ao re-renderizar
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: Object.keys(chartData),
          datasets: [
            {
              label: "Contagem",
              data: Object.values(chartData),
              backgroundColor: [
                "rgba(40, 167, 69, 0.8)", // Aprovados
                "rgba(220, 53, 69, 0.8)", // Falhas
                "rgba(255, 193, 7, 0.8)", // Ignorados
              ],
              borderColor: [
                "rgba(40, 167, 69, 1)",
                "rgba(220, 53, 69, 1)",
                "rgba(255, 193, 7, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.label || "";
                  if (label) {
                    label += ": ";
                  }
                  if (context.parsed !== null) {
                    label += context.parsed;
                  }
                  return label;
                },
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  return <canvas ref={chartRef} />;
};
