import  { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const RevenueChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, 'rgba(73, 219, 194, 0.4)'); // #49dbc2 with 0.4 opacity
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    const chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            data: [10, 12, 17, 28, 18, 21, 39, 48, 22, 23, 12, 10],
            borderColor: '#49dbc2', // teal line
            backgroundColor: gradient,
            fill: true,
            tension: 0.5,
            pointRadius: 4,
            pointBackgroundColor: '#49dbc2',
            pointBorderColor: '#49dbc2',
            pointHoverBackgroundColor: '#49dbc2',
            pointHoverBorderColor: '#49dbc2',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#d4f1ec', // light teal shade for tooltip
            titleColor: '#0e6c63',
            bodyColor: '#0e6c63',
          },
        },
        scales: {
          y: { grid: { display: false } },
          x: { grid: { display: false } },
        },
      },
    });

    return () => chartInstance.destroy();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-start h-[350px]">
      {/* Chart Area */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-2">Revenue</h2>
        <div className="relative w-full h-[260px]">
          <canvas ref={chartRef} className="absolute top-0 left-0 w-full h-full" />
        </div>
      </div>

      {/* Right Side: Big Circle + Label */}
      <div className="w-48 flex flex-col justify-center items-center ml-4 h-full space-y-2">
        {/* Big Circle */}
        <div
          className="w-24 h-24 rounded-full"
          style={{
            border: '5px solid #49dbc2',
            backgroundColor: '#ffffff',
          }}
        />

        {/* Legend Point */}
        <div className="flex items-center space-x-2 mt-1">
          <span className="inline-block w-3 h-3 rounded-full bg-[#49dbc2]" />
          <span className="text-xs text-gray-700">Revenue by month</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
