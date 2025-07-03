import { useEffect, useState } from "react";
import ActivityFeed from "./ActivityFeed";
import BookingsChart from "./BookingsChart";
import BookingsTable from "./BookingsTable";
import MessagesPanel from "./MessagesPanel";
import RevenueChart from "./RevenueChart";
import RevenueComparisonChart from "./RevenueComparisonChart";
import StatsOverview from "./StatsOverview";

const LimitedDashboard = () => {

    const [userName, setUserName] = useState<string>("...");
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("user_id");

    if (!storedToken || !storedUserId) return;

    setToken(storedToken);
    setUserId(storedUserId);

    // Fetch user data from the same API as MyProfile
    fetch(`http://localhost:9000/api/v1/users/${storedUserId}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ user data in dashboard:", data);
        if (data.full_name) setUserName(data.full_name);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch user name:", err);
      });
  }, []);

  useEffect(() => {
  if (token && userId) {
    console.log("Using token and userId somewhere...");
  }
}, [token, userId]);
  
  return (
    <div className="flex pb-20 w-full h-full">
      {/* Dashboard Content */}
      <div className="flex-grow bg-white">
        <div className="px-4 py-6">
          <h1 className="text-[30px] font-semibold mb-6 text-[#283456]">
            Welcome, {userName}
          </h1>

          <StatsOverview />

          <div className="flex flex-col lg:flex-row gap-5 mt-6">
            {/* Left Side */}
            <div className="w-full lg:w-1/3 flex flex-col gap-5">
              <ActivityFeed />
              <MessagesPanel />
            </div>

            {/* Right Side */}
            <div className="w-full lg:w-2/3 flex flex-col gap-5">
              <RevenueComparisonChart />
              <BookingsChart />
              <RevenueChart />
            </div>
          </div>

          {/* <div className="mt-6">
            <BookingsTable />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LimitedDashboard;