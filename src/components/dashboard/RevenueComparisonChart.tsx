import  { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const RevenueComparisonChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    const chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Sales by month, 2024',
            data: [200000, 300000, 350000, 400000, 550000, 500000, 400000, 350000, 300000, 250000, 200000],
            borderColor: '#d1d5db', // light gray line
            tension: 0.4,
            fill: false,
            pointRadius: 4,
            pointBackgroundColor: '#7250ff',
            pointBorderColor: '#7250ff',
          },
          {
            label: 'Sales by month, 2025',
            data: [300000, 350000, 400000, 550000, 590000, 680000, 600000, 590000, 550000, 400000, 350000, 300000],
            borderColor: '#d1d5db',
            tension: 0.4,
            fill: false,
            pointRadius: 4,
            pointBackgroundColor: '#49dbc2',
            pointBorderColor: '#49dbc2',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            grid: { display: false },
            min: 200000,
            max: 700000,
            ticks: {
              stepSize: 100000,
              callback: function (tickValue: string | number) {
                if (typeof tickValue === 'number') {
                  return tickValue.toLocaleString(); // e.g., 200,000
                }
                return tickValue;
              },
            },
          },
          x: { grid: { display: false } },
        },
      },
    });

    return () => chartInstance.destroy();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-start h-[400px]">
      {/* Left: Chart */}
      <div className="flex-1">
        <h2 className="text-lg font-bold mb-2">Revenue Comparison</h2>
        <div className="relative w-full h-[320px]">
          <canvas ref={chartRef} className="absolute top-0 left-0 w-full h-full" />
        </div>
      </div>

      {/* Right Panel - Centered Circle */}
      <div className="w-48 flex flex-col justify-center items-center ml-4 space-y-2 h-full">
        {/* Big Circle */}
        <div
          className="w-24 h-24 rounded-full"
          style={{
            border: '5px solid #7250ff',
            backgroundColor: '#ffffff',
          }}
        />

        {/* Legends below the circle */}
        <div className="space-y-1">
          <LegendDot color="#7250ff" label="Sales by month, 2024" />
          <LegendDot color="#49dbc2" label="Sales by month, 2025" />
        </div>
      </div>
    </div>
  );
};

const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center space-x-2">
    <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
    <span className="text-xs text-gray-700">{label}</span>
  </div>
);

export default RevenueComparisonChart;
