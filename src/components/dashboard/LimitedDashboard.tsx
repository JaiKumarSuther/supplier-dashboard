import ActivityFeed from "./ActivityFeed";
import BookingsChart from "./BookingsChart";
import BookingsTable from "./BookingsTable";
import MessagesPanel from "./MessagesPanel";
import RevenueChart from "./RevenueChart";
import RevenueComparisonChart from "./RevenueComparisonChart";
import StatsOverview from "./StatsOverview";

const LimitedDashboard = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Dashboard Content */}
      <div className="flex-grow bg-white">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Welcome, Eventica Travels
          </h1>

          <StatsOverview />

          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            {/* Left Side */}
            <div className="w-full lg:w-1/3 flex flex-col gap-6">
              <ActivityFeed />
              <MessagesPanel />
            </div>

            {/* Right Side */}
            <div className="w-full lg:w-2/3 flex flex-col gap-6">
              <RevenueComparisonChart />
              <BookingsChart />
              <RevenueChart />
            </div>
          </div>

          <div className="mt-6">
            <BookingsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LimitedDashboard;
