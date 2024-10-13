import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://connections-api.goit.global";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email: credentials.email,
        password: credentials.password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Login failed");
    }
  }
);

// Înregistrare utilizator nou
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/signup`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Registration failed"
      );
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const token = localStorage.getItem("token");
  try {
    await axios.post(
      `${API_URL}/users/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Logout failed:", error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
