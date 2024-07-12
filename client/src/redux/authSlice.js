import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const singUp = createAsyncThunk('auth/singUp', async (userData) => {
    const response = await axios.post('http://localhost:5000/signup', userData)
    return response.data
})

export const singIn = createAsyncThunk('auth/singIn', async (userData) => {
    const response = await axios.post('http://localhost:5000/signin', userData)
    return response.data
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user: null,
        status: 'idle',
        error: null
    },
    reducers: {
        logout: (state) => {
            state.token = null
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(singUp.fulfilled, (state, action) => {
                state.user = action.payload.data
                toast.success(action.payload.message)
            })
            .addCase(singIn.fulfilled, (state, action) => {
                state.token = action.payload.token
                toast.success(action.payload.message)
            })
            .addCase(singIn.rejected, (state, action) => {
                state.error = action.error.message 
                toast.error('Email ou mot de passe incorrect')
            })
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer