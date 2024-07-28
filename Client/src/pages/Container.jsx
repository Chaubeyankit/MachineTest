
import { Outlet } from "react-router-dom";
import { Navbar } from "@/Header/Navbar";

const Container = () => {
  return (
    <div className="relative">
      <Navbar />
      <div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Container;
