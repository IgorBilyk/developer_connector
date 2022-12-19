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
      console.log("init  login");
      const res = await axios.post("http://localhost:5000/auth", arg, config);
      console.log("res from actions", res.data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
//Get user by id
export const getUser = createAsyncThunk(
  "get/user",
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${arg.accessToken}`,
        },
      };
      const res = await axios.get(
        `http://localhost:5000/profile/user/${arg.id}`,
        arg,
        config
      );

      return res.data;
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
// Add/Update user experience
export const addExperience = createAsyncThunk(
  "Add/Update/experience",
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(`/experience`, arg, config);

      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// Delete an experience
export const deleteExperience = createAsyncThunk(
  "delete/experience",
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(arg);
      const res = await axios.delete(`/experience/${arg}/`, arg, config);

      return res;
    } catch (err) {
      return rejectWithValue("server", err.response.data);
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
