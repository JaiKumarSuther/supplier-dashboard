import StatsOverview from './StatsOverview';
import ActivityFeed from './ActivityFeed';
import MessagesPanel from './MessagesPanel';
import RevenueComparisonChart from './RevenueComparisonChart';
import BookingsChart from './BookingsChart';
import RevenueChart from './RevenueChart';
import BookingsTable from './BookingsTable';

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-[#f9f9f9] px-4 sm:px-6 lg:px-8 py-8">
      {/* Heading */}
      <h1 className="text-[22px] sm:text-2xl font-bold text-[#283456] mb-6">
        Welcome, Eventica Travels
      </h1>

      {/* Overview Stats */}
      <StatsOverview />

      {/* Charts & Activity Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <div className="space-y-6 lg:col-span-1">
          <ActivityFeed />
          <MessagesPanel />
        </div>

        <div className="space-y-6 lg:col-span-2">
          <RevenueComparisonChart />
          <BookingsChart />
          <RevenueChart />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="mt-8">
        <BookingsTable />
      </div>
    </main>
  );
};

export default Dashboard;
