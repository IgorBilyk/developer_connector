import { createSlice } from "@reduxjs/toolkit";

import {
  registerUser,
  loginUser,
  deleteUserProfile,
  getUser,
  clearErrors,
  checkLogin,
  addExperience,
  deleteExperience,
  addEducation
} from "./actions";

const token = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")
  : null;

const userSlice = createSlice({
  name: "user",
  initialState: {
    token,
    loading: false,
    userInfo: null,
    isLoggedIn: false,
    /* userData: JSON.parse(localStorage.getItem("data")), */
    userData: [],
    profileData: null,
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
      state.userData = [];
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
      localStorage.setItem("accessToken", payload);
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
      state.userInfo = payload.data.user;
      state.profileData = payload.data.user;
      state.loading = false;
      state.isLoggedIn = true;
      state.isAuthenticated = true;
      state.loggInError = [];
      state.errorMessages = [];
      console.log(payload);
      localStorage.setItem("accessToken", payload.data.accessTok);
      localStorage.setItem("refreshToken", payload.data.refreshTok);
      localStorage.setItem("data", JSON.stringify(payload.data.user));
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.errorMessages = [];
      state.isLoggedIn = false;
      state.loading = false;
      state.loggInError = payload;
      state.errorMessages.push(payload);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("data");
    },
    [deleteUserProfile.pending]: (state, { payload }) => {
      state.loading = true;
      state.loggInError = null;

      state.errorMessages.push(payload);
    },
    [deleteUserProfile.fulfilled]: (state, { payload }) => {
      state.userInfo = payload.data.user;
      state.loading = false;
      state.isLoggedIn = false;
      state.isAuthenticated = false;
      state.loggInError = [];
      state.errorMessages = [];
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("data");
    },
    [deleteUserProfile.rejected]: (state, { payload }) => {
      state.errorMessages = [];
      state.loggInError = payload;
      state.errorMessages.push(payload);

    },

    [getUser.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.loading = false;

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
    [addExperience.pending]: (state, { payload }) => {
      state.loading = true;
      state.errorMessages = [];
    },
    [addExperience.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.profileData.push({ experiences: payload });
    },
    [addExperience.rejected]: (state, { payload }) => {
      state.errorMessages = [];
      state.loading = false;
      state.errorMessages.push(payload);
    },
    [deleteExperience.pending]: (state, { payload }) => {
      state.loading = true;
      state.errorMessages = [];
    },
    [deleteExperience.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },
    [deleteExperience.rejected]: (state, { payload }) => {
      state.errorMessages = [];
      state.loading = false;
      state.errorMessages.push(payload);
    },
    [addEducation.pending]: (state, { payload }) => {
      state.loading = true;
      state.errorMessages = [];
    },
    [addEducation.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.profileData.push({ education: payload });
    },
    [addEducation.rejected]: (state, { payload }) => {
      state.errorMessages = [];
      state.loading = false;
      state.errorMessages.push(payload);
    },
  },
});

export const { showAlert, hideAlert, logOut } = userSlice.actions;
export default userSlice;
