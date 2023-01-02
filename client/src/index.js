import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import axios from "axios";
import store from "./store/store";

/* const refreshToken = localStorage.getItem("refreshToken");
 */ /* const accessToken = localStorage.getItem("accessToken");
axios.interceptors.request.use(
  function (config) {
    console.log("request", accessToken);

     return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
 */
/* axios.interceptors.response.use(
  function (response) {
     return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios
          .post(
            "http://localhost:5000/test",
            {},
            {
              "Content-Type": "application/json",

              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem("accessToken", res.data.accessToken);
              console.log("token set", res.data.accessToken);
            }
          });
        console.log("returned request");
        return axios(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
); */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
