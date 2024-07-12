import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProduits = createAsyncThunk('produits/fetchProduits', async (token) => {
  const response = await axios.get('http://localhost:5000/produits', {
    headers: { Authorization: token },
  })
  return response.data.data
})

export const addProduit = createAsyncThunk('produits/addProduit', async (produit, { getState }) => {
  const { auth: { token } } = getState()
  const response = await axios.post('http://localhost:5000/produits', produit, {
    headers: { Authorization: token },
  })
  return response.data.data
})

export const updateProduit = createAsyncThunk('produits/updateProduit', async ({ id, data }, { getState }) => {
  const { auth: { token } } = getState()
  const response = await axios.put(`http://localhost:5000/produits/${id}`, data, {
    headers: { Authorization: token },
  })
  return response.data.data
})

export const deleteProduit = createAsyncThunk('produits/deleteProduit', async (id, { getState }) => {
  const { auth: { token } } = getState()
  await axios.delete(`http://localhost:5000/produits/${id}`, {
    headers: { Authorization: token },
  })
  return id
})

const produitsSlice = createSlice({
  name: 'produits',
  initialState: [],
  reducers: {
    produitAdded: (state, action) => {
      state.push(action.payload)
    },
    produitUpdated: (state, action) => {
      const index = state.findIndex((produit) => produit._id === action.payload._id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    produitDeleted: (state, action) => {
      return state.filter((produit) => produit._id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduits.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(addProduit.fulfilled, (state, action) => {
        state.push(action.payload)
      })
      .addCase(updateProduit.fulfilled, (state, action) => {
        const index = state.findIndex((produit) => produit._id === action.payload._id)
        if (index !== -1) {
          state[index] = action.payload
        }
      })
      .addCase(deleteProduit.fulfilled, (state, action) => {
        return state.filter((produit) => produit._id !== action.payload)
      })
  }
})

export const { produitAdded, produitUpdated, produitDeleted } = produitsSlice.actions

export default produitsSlice.reducer
