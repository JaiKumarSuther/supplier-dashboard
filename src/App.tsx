import "./App.css";
import Header from "./components/Header";
import ListingActivity from "./components/listingactivity/ListingActivity";
import InclusionsExclusionsForm from "./components/listingbike/InclusionsExclusionsForm";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Sidebar />
      <Header />
      <div>
        <main className="flex pt-[80px] p-4 min-h-screen lg:ml-[95px]">
          <ListingActivity/>
          {/* <InclusionsExclusionsForm/> */}
        </main>
      </div>
    </>
  );
}

export default App;
