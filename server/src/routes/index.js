const express = require('express')
const router = express.Router()
const { signUp, signIn } = require('../controllers/userController')
const verifyToken = require('../middlewares/authMiddleware')
const { getProduits, addProduit, updateProduit, deleteProduit } = require('../controllers/productController')

router.post('/signup', signUp)
router.post('/signin', signIn)

router.route('/produits')
    .get(verifyToken, getProduits)
    .post(verifyToken, addProduit)

router.route('/produits/:id')
    .put(verifyToken, updateProduit)
    .delete(verifyToken, deleteProduit)

module.exports = router
