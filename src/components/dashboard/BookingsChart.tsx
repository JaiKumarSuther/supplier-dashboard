import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BookingsChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, 'rgba(114, 80, 255, 0.4)'); // Purple
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Fade

    const chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            data: [445000, 354000, 587500, 536000, 684000, 728700, 947000, 824700, 793000, 630000, 545000, 492000],
            borderColor: '#7250ff', // Purple line
            backgroundColor: gradient,
            fill: true,
            tension: 0.5,
            pointRadius: 4,
            pointBackgroundColor: '#7250ff', // Purple dots
            pointBorderColor: '#7250ff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
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
        <h2 className="text-lg font-semibold mb-2">Bookings</h2>
        <div className="relative w-full h-[260px]">
          <canvas ref={chartRef} className="absolute top-0 left-0 w-full h-full" />
        </div>
      </div>

      {/* Right Side: Big Circle + Legend */}
      <div className="w-48 flex flex-col justify-center items-center ml-4 h-full space-y-2">
        {/* Big Circle */}
        <div
          className="w-24 h-24 rounded-full"
          style={{
            border: '5px solid #7250ff',
            backgroundColor: '#ffffff',
          }}
        />

        {/* Legend Point: Bookings by Month */}
        <div className="flex items-center space-x-2 mt-1">
          <span className="inline-block w-3 h-3 rounded-full bg-[#7250ff]" />
          <span className="text-xs text-gray-700">Bookings by month</span>
        </div>
      </div>
    </div>
  );
};

export default BookingsChart;
