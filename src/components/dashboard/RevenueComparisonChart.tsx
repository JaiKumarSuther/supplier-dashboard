import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
const chartIcon = "/images/revmon-icon-in-chart.svg";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const RevenueComparisonChart = ({ supplierId }: { supplierId: string }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchDataAndRenderChart = async () => {
      try {
        const res = await fetch(
          `http://localhost:9000/api/v1/suppliers/${supplierId}/dashboard/revenue-comparison`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = await res.json();

        const sales2025 = result?.sales_2025 || [];
        const sales2024 = result?.sales_2024 || [];

        const map2025 = Object.fromEntries(sales2025.map((m: any) => [m.month, m.amount]));
        const map2024 = Object.fromEntries(sales2024.map((m: any) => [m.month, m.amount]));

        const ctx = chartRef.current?.getContext("2d");
        if (!ctx) return;

        const chartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: months,
            datasets: [
              {
                label: "Sales by month, 2025",
                data: months.map((m) => map2025[m] || 0),
                borderColor: "#49dbc2",
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
                data: months.map((m) => map2024[m] || 0),
                borderColor: "#2e8ee5",
                borderWidth: 2,
                tension: 0.4,
                fill: false,
                pointRadius: 3,
                pointHoverRadius: 4,
                pointBackgroundColor: "#2e8ee5",
                pointBorderColor: "#2e8ee5",
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
                ticks: {
                  stepSize: 100000,
                  color: "#4B5563",
                  font: { size: 12 },
                  callback: (val) =>
                    typeof val === "number" ? val.toLocaleString() : val,
                },
                grid: { display: false },
                border: { display: true, color: "#e5e7eb" },
              },
              x: {
                grid: { display: false },
                border: { display: true, color: "#e5e7eb" },
                ticks: {
                  color: "#6B7280",
                  font: { size: 12 },
                  maxRotation: 0,
                  minRotation: 0,
                },
              },
            },
          },
        });

        return () => chartInstance.destroy();
      } catch (error) {
        console.error("❌ Failed to fetch revenue comparison:", error);
      }
    };

    if (supplierId && token) {
      fetchDataAndRenderChart();
    }
  }, [supplierId]);

  return (
    <div className="bg-white flex-1 rounded-lg border p-3 sm:p-5 w-full min-h-[250px] sm:h-[300px]">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between h-full">
        <div className="w-full lg:w-[75%] h-[200px] lg:h-full flex flex-col gap-2 sm:gap-4">
          <h2 className="text-lg sm:text-[20px] font-semibold text-[#283456] mb-1">
            Revenue Comparison
          </h2>
          <div className="relative w-full flex-1 min-h-[160px] lg:h-[230px] overflow-visible">
            <canvas ref={chartRef} className="absolute top-0 left-0 w-full h-full" />
          </div>
        </div>
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
