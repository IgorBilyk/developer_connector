import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import axios from "axios";
import store from "./store/store";

axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    config.headers["Content-Type"] = "application/json";
    config.headers["userId"] = JSON.parse(localStorage.getItem("data"))._id;
    console.log("request", JSON.parse(localStorage.getItem("data"))._id);

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function (response) {
    console.log("response", response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = localStorage.getItem("refreshToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      console.log(error);
      return axios.request(error.config);
    }
    return Promise.reject(error);
  }
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
