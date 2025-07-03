import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
const revenueIcon = "/images/revenue-icon-in-chart.svg";

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
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
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
    <div className="bg-white flex-1 rounded-lg border p-3 sm:p-5 w-full min-h-[250px] sm:h-[300px]">
      {/* Mobile: Stack vertically, Desktop: Side by side */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between h-full">
        {/* Chart Section */}
        <div className="w-full sm:w-[75%] h-[200px] sm:h-full flex flex-col gap-2 sm:gap-4">
          <h2 className="text-lg sm:text-[20px] font-semibold text-[#283456] mb-1">Revenue</h2>
          <div className="relative w-full flex-1 min-h-[160px] sm:h-[230px] overflow-visible">
            <canvas ref={chartRef} className="absolute top-0 left-0 w-full h-full" />
          </div>
        </div>

        {/* Right: Icon + Legend */}
        <div className="w-full sm:w-[18%] flex flex-row sm:flex-col justify-center items-center gap-4 sm:gap-0 sm:h-full mt-4 sm:mt-0">
          <div className="w-16 h-16 sm:w-[100px] sm:h-[100px] rounded-full border-4 border-[#49dbc2] flex items-center justify-center mb-0 sm:mb-3 bg-white">
            <img src={revenueIcon} alt="Revenue Icon" className="w-[20px] sm:w-[28px]" />
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-700">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#49dbc2]" />
            <span className="text-[10px] sm:text-[12px] font-normal text-[#434D68]">Revenue by month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
