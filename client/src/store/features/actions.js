import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

//Register User

export const registerUser = createAsyncThunk(
  "register/user",
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/users", arg, config);

      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//Clear Errors
export const clearErrors = createAsyncThunk(
  "clear/user",
  async (arg, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return await axios.post("/auth", arg, config);
  }
);
// Login User
export const loginUser = createAsyncThunk(
  "login/user",
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/auth", arg, config);

      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const checkLogin = createAsyncThunk(
  "check/user",
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${arg}`,
        },
      };
      const res = await axios.post("/auth", arg, config);

      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getAllPosts = createAsyncThunk(
  "get/posts",
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${arg}`,
        },
      };
      const res = await axios.get("/posts", arg, config);

      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
