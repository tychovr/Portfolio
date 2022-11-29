import Navbar from "../../components/navbar/navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;