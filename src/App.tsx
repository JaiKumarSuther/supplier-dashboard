import "./App.css";
import Header from "./components/Header";
import ListingTourSidebar from "./components/listingactivity/ListingTourSidebar";
import PricingAddonsSection from "./components/listingactivity/PricingAddonsSection";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Sidebar />
      <div>
        <Header />
        <main className="flex pt-[80px] p-4 min-h-screen lg:ml-[95px]">
          <ListingTourSidebar/>
          <PricingAddonsSection/>
          
        </main>
      </div>
    </>
  );
}

export default App;
