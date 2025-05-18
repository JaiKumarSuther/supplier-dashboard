import "./App.css";
import Header from "./components/Header";
import ListingActivity from "./components/listingactivity/ListingActivity";
import CarListingActivity from "./components/listingcar/ListingCar";
import Sidebar from "./components/Sidebar";


function App() {
  return (
    <>
      <Sidebar />
      <Header />
      <div>
        <main className="flex pt-[80px] p-4 min-h-screen lg:ml-[95px]">
          {/* <ListingActivity/> */}
          <CarListingActivity/>
        </main>
      </div>
    </>
  );
}

export default App;
