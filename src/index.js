import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./components/index/Index";
import Users from "./components/index/Users";
import UserProfile from "./components/index/UserProfile";
import Products from "./components/index/Products";
import StaticPages from "./components/index/StaticPages";
import Categories from "./components/index/Categories";
import store from "./redux/store";
import { Provider } from "react-redux";

import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
import Login from "./components/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Index />} />
          <Route path="users" element={<Users />} />
          <Route path="user" element={<UserProfile />} />
          <Route path="products" element={<Products />} />
          <Route path="static" element={<StaticPages />} />
          <Route path="categories" element={<Categories />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
