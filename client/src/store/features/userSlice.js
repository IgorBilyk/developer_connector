import { createSlice } from "@reduxjs/toolkit";

import { registerUser, loginUser, clearErrors, checkLogin } from "./actions";

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
    loggInError: [],
    errorMessages: [],
    isAuthenticated: false,
    isLoggedIn: localStorage.getItem("token") ? true : false,
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
      localStorage.removeItem("token");
      localStorage.removeItem("data");
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
      state.loading = false;
      state.isLoggedIn = true;
      state.isAuthenticated = true;
      state.loggInError = null;
      state.errorMessages = [];

      localStorage.setItem("token", payload.data.accessTok);
      localStorage.setItem("data", JSON.stringify(payload.data.user));
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.errorMessages = [];
      state.loading = false;
      state.loggInError = payload;
      state.errorMessages.push(payload);

      localStorage.removeItem("token");
      localStorage.removeItem("data");
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