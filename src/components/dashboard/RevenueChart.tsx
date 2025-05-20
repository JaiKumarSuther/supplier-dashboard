import  { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const RevenueChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 230);
    gradient.addColorStop(0, 'rgba(53, 75, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    const chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            data: [10, 12, 17, 28, 18, 21, 39, 48, 22, 23, 12, 10],
            borderColor: '#7250ff',
            backgroundColor: gradient,
            fill: true,
            tension: 0.7,
            pointRadius: 3,
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
      <h2 className="text-lg font-semibold mb-4">Revenue</h2>
      <div className="relative w-full h-[220px]">
        <canvas ref={chartRef} className="absolute top-0 left-0 w-full h-full" />
      </div>
    </div>
  );
};

export default RevenueChart;