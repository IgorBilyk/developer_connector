import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import dashboardSlice from "./features/dashboardSlice";

const store = configureStore({
  reducer: {
    register: userSlice.reducer,
    posts: dashboardSlice.reducer,
  },
});

export default store;
