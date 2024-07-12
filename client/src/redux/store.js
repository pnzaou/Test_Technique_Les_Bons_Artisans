import { configureStore } from '@reduxjs/toolkit';
import produitsReducer from './produitsSlice'
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        produits: produitsReducer,
        auth: authReducer
    }
})

export default store;