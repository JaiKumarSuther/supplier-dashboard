import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import revenueIcon from '/public/images/revenue icon in chart.svg';

const RevenueChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, 'rgba(73, 219, 194, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    const chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Revenue by month',
            data: [
              470000, 360000, 620000, 580000, 700000, 720000,
              950000, 860000, 830000, 680000, 600000, 550000
            ],
            fill: true,
            backgroundColor: gradient,
            borderColor: '#49dbc2',
            borderWidth: 3,
            tension: 0.5,
            pointRadius: 4,
            pointHoverRadius: 5,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#49dbc2',
            pointBorderWidth: 2,
            clip: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#d4f1ec',
            titleColor: '#0e6c63',
            bodyColor: '#0e6c63',
            callbacks: {
              label: (context) => {
                const value = context.parsed.y;
                return `Revenue: ${value.toLocaleString()}`;
              },
            },
          },
        },
        layout: {
          padding: { top: 5, bottom: 5, left: 0, right: 0 },
        },
        scales: {
          y: {
            min: 300000,
            max: 1000000,
            ticks: {
              stepSize: 100000,
              color: '#4B5563',
              font: { size: 12 },
              callback: (value) => Number(value).toLocaleString(),
            },
            grid: { display: false },
            border: { display: true, color: '#e5e7eb' },
          },
          x: {
            ticks: {
              color: '#6B7280',
              font: { size: 12 },
            },
            grid: { display: false },
            border: { display: true, color: '#e5e7eb' },
          },
        },
      },
    });

    return () => chartInstance.destroy();
  }, []);

  return (
    <div className="bg-white rounded-lg border px-4 py-3 flex items-center w-full" style={{ height: '300px' }}>
      {/* Chart Section */}
      <div className="w-[82%] h-full pr-2">
        <h2 className="text-lg font-semibold text-[#1e2a49] mb-1">Revenue</h2>
        <div className="relative w-full h-[230px] overflow-visible">
          <canvas ref={chartRef} className="absolute top-0 left-0 w-full h-full" />
        </div>
      </div>

      {/* Right: Icon + Legend */}
      <div className="w-[18%] flex flex-col justify-center items-center h-full">
        <div className="w-[100px] h-[100px] rounded-full border-4 border-[#49dbc2] flex items-center justify-center mb-3 bg-white">
          <img src={revenueIcon} alt="Revenue Icon" className="w-[28px]" />
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-700">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#49dbc2]" />
          <span className="text-[12px] font-normal">Revenue by month</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
