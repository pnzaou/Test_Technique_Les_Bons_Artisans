import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { singIn } from '../redux/authSlice'
import { TextField, Button, Card, CardContent, CardActions, Container, Typography } from '@mui/material'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(singIn({ email, password }))

    setEmail('')
    setPassword('')
  }

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Connexion
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <CardActions>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Se connecter
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}

export default SignIn
