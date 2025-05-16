import "./App.css";
import Header from "./components/Header";
import FaqForm from "./components/listingactivity/FaqForm";
import InclusionsExclusionsForm from "./components/listingactivity/InclusionsExclusionsForm";
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
          {/* <PricingAddonsSection/>  */}
          {/* <FaqForm/> */}
          <InclusionsExclusionsForm/>
        </main>
      </div>
    </>
  );
}

export default App;
