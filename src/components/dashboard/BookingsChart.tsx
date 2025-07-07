import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
const bookingIcon = "/images/booking-icon-in-chart.svg";

interface Props {
  supplierId: string;
}

const BookingsChart = ({ supplierId }: Props) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);

  useEffect(() => {
    if (!supplierId) return;

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`http://localhost:9000/api/v1/suppliers/${supplierId}/dashboard/bookings-chart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();

        const ctx = chartRef.current?.getContext('2d');
        if (!ctx) return;

        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(114, 80, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        if (chartInstance) chartInstance.destroy();

        const newChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: result.labels,
            datasets: [{
              label: 'Bookings by month',
              data: result.data,
              fill: true,
              backgroundColor: gradient,
              borderColor: '#7250ff',
              borderWidth: 3,
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 5,
              pointBackgroundColor: '#ffffff',
              pointBorderColor: '#7250ff',
              pointBorderWidth: 2,
              clip: false,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                titleColor: '#fff',
                bodyColor: '#fff',
              },
            },
            layout: {
              padding: { top: 5, bottom: 5, left: 0, right: 0 },
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

        setChartInstance(newChart);
      } catch (err) {
        console.error("📉 Error loading bookings chart:", err);
      }
    };

    fetchData();

    return () => {
      if (chartInstance) chartInstance.destroy();
    };
  }, [supplierId]);

  return (
    <div className="bg-white flex-1 rounded-lg border p-3 sm:p-5 w-full min-h-[250px] sm:h-[300px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between h-full">
        <div className="w-full sm:w-[75%] h-[200px] sm:h-full flex flex-col gap-2 sm:gap-4">
          <h2 className="text-lg sm:text-[20px] font-semibold text-[#283456] mb-1">Bookings</h2>
          <div className="relative w-full flex-1 min-h-[160px] sm:h-[230px] overflow-visible">
            <canvas ref={chartRef} className="absolute top-0 left-0 w-full h-full" />
          </div>
        </div>
        <div className="w-full sm:w-[18%] flex flex-row sm:flex-col justify-center items-center gap-4 sm:gap-0 sm:h-full mt-4 sm:mt-0">
          <div className="w-16 h-16 sm:w-[100px] sm:h-[100px] rounded-full border-4 border-[#7250ff] flex items-center justify-center mb-0 sm:mb-3">
            <img src={bookingIcon} alt="Booking Icon" className="w-4 sm:w-8" />
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-700">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#7250ff]" />
            <span className="text-[10px] sm:text-[12px] font-normal text-[#434D68]">Bookings by month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsChart;
