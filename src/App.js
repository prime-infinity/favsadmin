import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, Outlet, useNavigate } from "react-router-dom";

import AdminNavbar from "./components/AdminNavbar";
import SideBar from "./components/SideBar";

function App() {
  const mainContent = React.useRef(null);
  const location = useLocation();
  let navigate = useNavigate();
  const authState = useSelector((state) => state.auth.auth);

  useEffect(() => {
    console.log(authState);
    if (authState === false) {
      navigate(`/login`);
    }
    if (authState === true) {
      navigate(`/`);
    }
    // eslint-disable-next-line
  }, [authState]);

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
