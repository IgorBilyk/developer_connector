import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts } from "./actions";
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: false,
    posts: [],
    click: false,
  },
  reducers: {
    updateDashboard: (state, action) => {
      state.click = !state.click;
    },
  },
  extraReducers: {
    [getAllPosts.pending]: (state, { payload }) => {
      state.loading = true;
      state.errorMessages = [];
    },
    [getAllPosts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.posts.push(payload);
    },
  },
});
export default dashboardSlice;
export const { updateDashboard } = dashboardSlice.actions;
