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
      const res = await axios.post("http://localhost:5000/auth", arg, config);
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
// Add/Update Profile data
export const addProfileData = createAsyncThunk(
  "Add/Update/profile",
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${arg.refreshToken}`,
          "Content-Type": "application/json",
        },
      };
      console.log(arg, "from action");
      const res = await axios.post(`/`, arg.result, config);

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
      const res = await axios.delete(
        `/experience/${arg.experience_id}/${arg.user_id}`,
        arg,
        config
      );

      return res;
    } catch (err) {
      return rejectWithValue("server", err.response.data);
    }
  }
);
// Add/Update user education
export const addEducation = createAsyncThunk(
  "Add/Update/education",
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(`/education`, arg, config);

      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// Delete education
export const deleteEducation = createAsyncThunk(
  "delete/education",
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(arg);
      const res = await axios.delete(
        `/education/${arg._id}/${arg.user_id}`,
        arg,
        config
      );

      return res;
    } catch (err) {
      return rejectWithValue("server", err.response.data);
    }
  }
);
// Delete User profile
export const deleteUserProfile = createAsyncThunk(
  "delete/user-profile",
  async (arg, { rejectWithValue }) => {
    try {
      /*  const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${arg.refreshToken}`,
        },
      };
 */
      console.log(arg, "from actions delete user");
      const res = await axios.delete(`/profile/delete/${arg.user_id}`, arg);
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
