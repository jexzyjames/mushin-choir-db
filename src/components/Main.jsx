import Header from "./Header";
import { Outlet } from "react-router-dom";
import CircularScrollProgress from "../utils/CircularScrollProgress";

const Main = () => {
  return (
    <div className="min-h-screen bg-[#0B0704] text-[#F5EBD8]">
      <Header />
      <main>
        <Outlet/>
      </main>
      <CircularScrollProgress/>
    </div>
  );
};

export default Main;
