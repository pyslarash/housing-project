import React, { useRef, useEffect } from 'react';
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';

function WeatherChart({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    const chartCtx = chartRef.current.getContext('2d');

    Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

    new Chart(chartCtx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Temperature',
            data: data.map(datum => ({
              x: new Date(datum.time),
              y: datum.temperature_2m
            })),
            borderColor: 'blue',
            borderWidth: 2,
            fill: false,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: context => `${context.dataset.label}: ${context.parsed.y}°F`
            }
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              displayFormats: {
                hour: 'MMM D h:mm A'
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Temperature (°F)'
            },
            suggestedMin: 20,
            suggestedMax: 80
          }
        }
      }
    });
  }, [data]);

  return (
    <canvas ref={chartRef} />
  );
}

export default WeatherChart;