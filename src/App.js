import { useState } from "react";
import AddEnteries from "./pages/AddEnteries";
import AllEnteries from "./pages/AllEnteries";
function App() {
  const [current, setCurrent] = useState("add");
  return (
    <div className="flex justify-start items-start w-screen h-screen bg-white">
      {/* add new entery */}
      {/* nav */}
      <div className="w-[200px] h-screen bg-gray-200 shadow-lg mt-4">
        <div
          className={`w-[200px] h-[60px]  border-b border-b-black cursor-pointer hover:bg-gray-600 justify-center items-center flex ${
            current === "add" ? "bg-gray-700" : "bg-gray-500"
          }`}
          onClick={() => setCurrent("add")}
        >
          <p className="text-white">Add new Entery</p>
        </div>
        <div
          className={`w-[200px] h-[60px]  border-b border-b-black cursor-pointer hover:bg-gray-600 justify-center items-center flex ${
            current === "all" ? "bg-gray-700" : "bg-gray-500"
          }`}
          onClick={() => setCurrent("all")}
        >
          <p className="text-white">All Enteries</p>
        </div>
      </div>
      {current === "add" && <AddEnteries />}
      {current === "all" && <AllEnteries />}
    </div>
  );
}

export default App;
