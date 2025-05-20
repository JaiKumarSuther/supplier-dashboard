import { useEffect, useRef } from 'react';
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
            data: [200000, 250000, 300000, 350000, 400000, 550000, 500000, 400000, 350000, 300000, 250000, 200000],
            borderColor: '#7250ff',  // Purple border for line to match legend border
            backgroundColor: 'rgba(114, 80, 255, 0.1)',
            tension: 0.5,
            fill: false,
            pointRadius: 4,
            pointBackgroundColor: '#7250ff',
          },
          {
            label: 'Sales by month, 2025',
            data: [300000, 350000, 400000, 550000, 590000, 680000, 600000, 590000, 550000, 400000, 350000, 300000],
            borderColor: '#49dbc2',
            backgroundColor: 'rgba(73, 219, 194, 0.1)',
            tension: 0.5,
            fill: false,
            pointRadius: 4,
            pointBackgroundColor: '#49dbc2',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { grid: { display: false } }, x: { grid: { display: false } } },
      },
    });

    return () => chartInstance.destroy();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4 h-[300px]">
      <h2 className="text-lg font-semibold mb-4">Revenue Comparison</h2>
      <div className="flex h-[220px]">
        {/* Chart container */}
        <div className="relative flex-1">
          <canvas ref={chartRef} className="absolute top-0 left-0 w-full h-full" />
        </div>

        {/* Custom legend on right */}
        <div className="ml-6 flex flex-col justify-center space-y-4 w-48">
          <LegendItem color="#7250ff" label="Sales by month, 2024" />
          <LegendItem color="#49dbc2" label="Sales by month, 2025" />
        </div>
      </div>
    </div>
  );
};

// Legend item with white fill and thick purple border circle
const LegendItem = ({
  color,
  label,
}: {
  color: string;
  label: string;
}) => (
  <div className="flex items-center space-x-3">
    <span
      style={{
        width: 16,
        height: 16,
        borderRadius: '50%',
        border: `3px solid ${color}`, // thick border in color
        backgroundColor: '#fff',     // white inside
        display: 'inline-block',
      }}
    />
    <span className="text-sm text-gray-700">{label}</span>
  </div>
);

export default RevenueComparisonChart;