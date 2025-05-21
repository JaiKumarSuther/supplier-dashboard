import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import bookingIcon from '/public/images/booking icon in chart.svg';

const BookingsChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(114, 80, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
          'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [
          {
            label: 'Bookings by month',
            data: [10, 12, 20, 30, 18, 22, 40, 50, 20, 24, 5, 6],
            fill: true,
            backgroundColor: gradient,
            borderColor: '#7250ff',
            borderWidth: 3, // ✅ thicker line
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 5,
            pointBackgroundColor: '#ffffff', // ✅ hollow dots
            pointBorderColor: '#7250ff',
            pointBorderWidth: 2,
            clip: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 5,
            bottom: 5,
            left: 0,
            right: 0,
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#7250ff',
            titleColor: '#fff',
            bodyColor: '#fff',
          },
        },
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: 80,
            ticks: {
              stepSize: 10,
              color: '#4B5563',
              font: { size: 12 },
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

    return () => chart.destroy();
  }, []);

  return (
    <div className="bg-white rounded-lg border p-5 flex items-center justify-between w-full" style={{ height: '300px' }}>
      {/* Chart Area */}
      <div className="w-[75%] h-full pr-2">
        <h2 className="text-lg font-semibold text-[#1e2a49] mb-1">Bookings</h2>
        <div className="relative w-full h-[230px] overflow-visible">
          <canvas ref={chartRef} className="absolute top-0 left-0 w-full h-full" />
        </div>
      </div>

      {/* Legend + Icon */}
      <div className="w-[18%] flex flex-col justify-center items-center h-full">
        <div className="w-[100px] h-[100px] rounded-full border-4 border-[#7250ff] flex items-center justify-center mb-3">
          <img src={bookingIcon} alt="Booking Icon" width="32" />
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-700">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#7250ff]" />
          <span className="text-[12px] font-normal">Bookings by month</span>
        </div>
      </div>
    </div>
  );
};

export default BookingsChart;
