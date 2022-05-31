import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";

function App() {
  return (
    <>
      <SideBar
        logo={{
          innerLink: "/",
          imgSrc: require("./assets/img/brand/brandimg.png").default,
          imgAlt: "...",
        }}
      />
      <Outlet />
    </>
  );
}

export default App;
