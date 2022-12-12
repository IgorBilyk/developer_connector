import { createSlice } from "@reduxjs/toolkit";

import {
  registerUser,
  loginUser,
  getUser,
  clearErrors,
  checkLogin,
} from "./actions";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const userSlice = createSlice({
  name: "user",
  initialState: {
    token,
    localToken: localStorage.getItem("token") || null,
    loading: false,
    userInfo: null,
    userData: JSON.parse(localStorage.getItem("data")),
    profileData: [],
    loggInError: [],
    errorMessages: [],
    isAuthenticated: false,
    isLoggedIn: localStorage.getItem("accessToken") ? true : false,
  },
  reducers: {
    showAlert: (state, action) => {
      const data = action.payload;
      state.errorMessages.push({ msg: data });

      console.log(action);
    },
    hideAlert: (state) => {
      state.errorMessages = [];
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("data");
      window.location("/");
      console.log("Logout");
    },
    checkLogin: (state) => {
      if (localStorage.getItem("token")) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
  },
  extraReducers: {
    [registerUser.pending]: (state, { payload }) => {
      state.loading = true;
      state.errorMessages = [];
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      localStorage.setItem("token", payload.data.token);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.errorMessages = [];
      state.loading = false;
      state.errorMessages.push(payload);
    },

    [loginUser.pending]: (state, { payload }) => {
      state.loading = true;
      state.loggInError = null;

      state.errorMessages.push(payload);
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.token = payload.data.token;
      state.userInfo = payload.data.user;
      state.userData.push(payload.data.user);
      state.loading = false;
      state.isLoggedIn = true;
      state.isAuthenticated = true;
      state.loggInError = [];
      state.errorMessages = [];
      console.log(payload);
      localStorage.setItem("accessToken", payload.data.accessTok);
      localStorage.setItem("data", JSON.stringify(payload.data.user));
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.errorMessages = [];
      state.loading = false;
      state.loggInError = payload;
      state.errorMessages.push(payload);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("data");
    },

    [getUser.pending]: (state, { payload }) => {},
    [getUser.fulfilled]: (state, { payload }) => {
      state.errorMessages = [];
      state.profileData = [];
      state.profileData.push(payload);
    },
    [getUser.rejected]: (state, { payload }) => {
      state.errorMessages = payload;
    },
    [clearErrors.fulfilled]: (state, { payload }) => {
      state.errorMessages = [];
      state.userInfo = state.userInfo;
    },

    [checkLogin.pending]: (state, { payload }) => {
      console.log(payload);
    },
    [checkLogin.fulfilled]: (state, { payload }) => {
      console.log(payload);
    },
    [checkLogin.rejected]: (state, { payload }) => {
      console.log(payload);
    },
  },
});

export const { showAlert, hideAlert, logOut } = userSlice.actions;
export default userSlice;
