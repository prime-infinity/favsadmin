import React from "react";
import { useLocation, Outlet } from "react-router-dom";

import AdminNavbar from "./components/AdminNavbar";
import SideBar from "./components/SideBar";

function App() {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  return (
    <>
      <SideBar
        logo={{
          innerLink: "/",
          imgSrc: require("./assets/img/brand/brandimg.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
