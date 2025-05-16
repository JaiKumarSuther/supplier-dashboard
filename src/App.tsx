import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Sidebar />
      <div>
        <Header />
        <main className="pt-[80px] p-4 bg-gray-100 min-h-screen lg:ml-[95px]">
          {/* Content here */}
        </main>
      </div>
    </>
  );
}

export default App;
