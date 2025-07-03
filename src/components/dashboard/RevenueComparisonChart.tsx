import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
const chartIcon = "/images/revmon-icon-in-chart.svg";

const RevenueComparisonChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    const chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jan", "Feb", "Mar", "Apr", "May", "June",
          "July", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        datasets: [
          {
            label: "Sales by month, 2025",
            data: [
              300000, 350000, 400000, 550000, 590000, 680000,
              600000, 590000, 550000, 400000, 350000, 300000
            ],
            borderColor: "#d1d5db",
            borderWidth: 2,
            tension: 0.4,
            fill: false,
            pointRadius: 3,
            pointHoverRadius: 4,
            pointBackgroundColor: "#49dbc2",
            pointBorderColor: "#49dbc2",
            pointBorderWidth: 1,
            clip: false,
          },
          {
            label: "Sales by month, 2024",
            data: [
              200000, 280000, 340000, 400000, 550000, 500000,
              400000, 350000, 300000, 250000, 200000, 200000
            ],
            borderColor: "#d1d5db",
            borderWidth: 2,
            tension: 0.4,
            fill: false,
            pointRadius: 3,
            pointHoverRadius: 4,
            pointBackgroundColor: "#3b82f6",
            pointBorderColor: "#3b82f6",
            pointBorderWidth: 1,
            clip: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { left: 0, right: 0, top: 5, bottom: 5 },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            titleColor: "#ffffff",
            bodyColor: "#ffffff",
            borderColor: "#d1d5db",
            borderWidth: 1,
          },
        },
        scales: {
          y: {
            min: 200000,
            max: 700000,
            grid: { display: false },
            border: { display: true, color: '#e5e7eb' },
            ticks: {
              stepSize: 100000,
              color: "#4B5563",
              font: { size: 12 },
              callback: (tickValue) =>
                typeof tickValue === "number"
                  ? tickValue.toLocaleString()
                  : tickValue,
            },
          },
          x: {
            grid: { display: false },
            border: { display: true, color: '#e5e7eb' },
            ticks: {
              maxRotation: 0,
              minRotation: 0,
              color: "#6B7280",
              font: { size: 12 },
            },
          },
        },
      },
    });

    return () => chartInstance.destroy();
  }, []);

  return (
    <div className="bg-white flex-1 rounded-lg border p-3 sm:p-5 w-full min-h-[250px] sm:h-[300px]">
      {/* Mobile: Stack vertically, Desktop: Side by side */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between h-full">
        {/* Chart Area */}
        <div className="w-full lg:w-[75%] h-[200px] lg:h-full flex flex-col gap-2 sm:gap-4">
          <h2 className="text-lg sm:text-[20px] font-semibold text-[#283456] mb-1">
            Revenue Comparison
          </h2>
          <div className="relative w-full flex-1 min-h-[160px] lg:h-[230px] overflow-visible">
            <canvas
              ref={chartRef}
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </div>

        {/* Legend + Icon */}
        <div className="w-full lg:w-[20%] flex flex-row lg:flex-col justify-center items-center gap-4 lg:gap-0 lg:h-full mt-4 lg:mt-0">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-[100px] lg:h-[100px] rounded-full flex items-center justify-center mb-0 lg:mb-3"
            style={{ border: "4px solid #ad83ff" }}
          >
            <img src={chartIcon} alt="Chart Icon" className="w-4 sm:w-5 lg:w-6" />
          </div>
          <div className="flex flex-col lg:space-y-1 gap-1 lg:gap-0 text-xs">
            <LegendDot color="#49dbc2" label="Sales by month, 2025" />
            <LegendDot color="#2e8ee5" label="Sales by month, 2024" />
          </div>
        </div>
      </div>
    </div>
  );
};

const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center space-x-1">
    <span
      className="inline-block w-2.5 h-2.5 rounded-full"
      style={{ backgroundColor: color }}
    />
    <span className="text-[#434D68] text-[10px] sm:text-[12px]">{label}</span>
  </div>
);

export default RevenueComparisonChart;
