import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    isAuthenticated: false,
    user: null,
    message: null,
    error: null
};

// endpoints
export const BACKEND_URL = "https://nikhil-todo.onrender.com/api/v1"

// login
export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
    const response = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password}) 
      });
     
      const data = await response.json();
      return data;
  }
)

// login
export const getProfie = createAsyncThunk('auth/me', async () => {
    const response = await fetch(`${BACKEND_URL}/me`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      return data;
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    requestApi: (state) => {
        state.loading = true;
    },
    logoutSuccess: (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
    },
    addTaskSuccess: (state,action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    requestFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload;
    },
    setMessage: (state,action) => {
        state.message = action.payload.message;
    },
    setError: (state,action) => {
        state.error = action.payload.message;
    },
    clearMessage: (state,action) => {
        state.message = null
    },
    clearError: (state,action) => {
        state.error = null
    },
  },
  extraReducers: (builder) => {   
    builder
    .addCase(loginUser.pending,(state) => {
        state.loading = true;
    })
    .addCase(loginUser.fulfilled,(state,action) => {
        state.loading = false;
        state.message = action.payload.message;
        if(action.payload.success === false){
            state.error = action.payload.message
            return;
        }
        state.user = action.payload.user;
        state.isAuthenticated = true
    })
    .addCase(loginUser.rejected,(state,action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(getProfie.pending,(state) => {
        state.loading = true;
    })
    .addCase(getProfie.fulfilled,(state,action) => {
        state.loading = false;
        if(action.payload.success === false){
            state.error = action.payload.message
            return;
        }
        state.user = action.payload.user;
    })
    .addCase(getProfie.rejected,(state,action) => {
        state.loading = false;
        state.error = action.payload;
    })
}
});

export const { requestApi, addTaskSuccess, addTaskFailure,setMessage, setError, clearMessage, logoutSuccess, clearError } = authSlice.actions;
export default authSlice.reducer;