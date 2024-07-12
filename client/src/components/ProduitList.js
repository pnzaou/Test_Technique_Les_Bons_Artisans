import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteProduit, produitAdded, produitDeleted, produitUpdated } from '../redux/produitsSlice'
import { Container, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import ProduitForm from './ProduitForm'
import { fetchProduits } from '../redux/produitsSlice'
import socket from '../services/socket'

const ProduitList = () => {
  const produits = useSelector((state) => state.produits)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [selectedProduit, setSelectedProduit] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    if (token) {
      dispatch(fetchProduits(token))
    }

    socket.on('produitAdded', (produit) => {
      dispatch(produitAdded(produit))
    })
    
    socket.on('produitUpdated', (produit) => {
      dispatch(produitUpdated(produit))
    })
    
    socket.on('produitDeleted', (id) => {
      dispatch(produitDeleted(id))
    })

    return () => {
      socket.off('produitAdded')
      socket.off('produitUpdated')
      socket.off('produitDeleted')
    }

  }, [token, dispatch])

  const handleDelete = (id) => {
    dispatch(deleteProduit(id))
  }

  const handleEdit = (produit) => {
    setSelectedProduit(produit)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setSelectedProduit(null)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
  }

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Ajouter Produit
      </Button>
      <List>
        {produits.map((produit) => (
          <ListItem key={produit._id}>
            <ListItemText primary={produit.name} secondary={`Type: ${produit.type}, Prix: ${produit.price}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(produit)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(produit._id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {isFormOpen && <ProduitForm produit={selectedProduit} onClose={handleCloseForm} />}
    </Container>
  )
}

export default ProduitList
