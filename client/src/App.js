import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import ProduitList from './components/ProduitList'
import { Button, Container } from '@mui/material'

const App = () => {
  const { token } = useSelector(state => state.auth)
  const [hiddenSignUp, setHiddenSignUp] = useState(true)

  const toggleSignUp = () => setHiddenSignUp(!hiddenSignUp)
  return (
    <Container>
      {!token ? (
        <div>
          <Button variant="contained" color="primary"  onClick={toggleSignUp}>{hiddenSignUp ? "S'inscrire" : "Se connecter"}</Button>
          {!hiddenSignUp ? '' : <SignIn/>}
          {hiddenSignUp ? '' : <SignUp handleToggle={toggleSignUp}/>}
        </div>
      ) : (
        <ProduitList />
      )}
    </Container>
  )
}

export default App
