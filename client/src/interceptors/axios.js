import axios from "axios";
axios.defaults.baseURL = "https://localhosts:3000/";

axios.interceptors.request.use(
  function (config) {
    console.log(request);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (resp) => console.log(resp),
  async (error) => {
    console.log("axios interceptor response", error.response.status);

    return error;
  }
);
