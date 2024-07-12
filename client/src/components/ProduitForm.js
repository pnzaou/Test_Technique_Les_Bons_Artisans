import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduit, updateProduit } from '../redux/produitsSlice'
import { TextField, Button, Container, Typography } from '@mui/material'

const ProduitForm = ({ produit, onClose }) => {
  const [name, setName] = useState(produit ? produit.name : '')
  const [type, setType] = useState(produit ? produit.type : '')
  const [price, setPrice] = useState(produit ? produit.price : 0)
  const [rating, setRating] = useState(produit ? produit.rating : 0)
  const [warrantyYears, setWarrantyYears] = useState(produit ? produit.warranty_years : 0)
  const [available, setAvailable] = useState(produit ? produit.available : false)
  
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProduit = { name, type, price, rating, warranty_years: warrantyYears, available }

    if (produit) {
      dispatch(updateProduit({ id: produit._id, data: newProduit }))
    } else {
      dispatch(addProduit(newProduit))
    }
    onClose()
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" component="h2" gutterBottom>
        {produit ? 'Modifier Produit' : 'Ajouter Produit'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Nom" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" required />
        <TextField label="Type" value={type} onChange={(e) => setType(e.target.value)} fullWidth margin="normal" required />
        <TextField label="Prix" type="number" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth margin="normal" required />
        <TextField label="Évaluation" type="number" value={rating} onChange={(e) => setRating(e.target.value)} fullWidth margin="normal" />
        <TextField label="Années de garantie" type="number" value={warrantyYears} onChange={(e) => setWarrantyYears(e.target.value)} fullWidth margin="normal" required />
        <TextField label="Disponible" type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} margin="normal" />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {produit ? 'Modifier' : 'Ajouter'}
        </Button>
      </form>
    </Container>
  )
}

export default ProduitForm
