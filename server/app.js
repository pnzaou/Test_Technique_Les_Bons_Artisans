const express = require('express')
const cors = require('cors')
const router = require('./src/routes/index')
require('dotenv').config()
const bodyparser = require('body-parser')
const http = require('http')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server, { cors: { origin: '*' } })

const port = process.env.PORT || 5000

io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté')
    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté')
    })
})

app
    .use(bodyparser.json())
    .use(cors())
    .use(router)

app.get('/', (req, res) => {
    res.send('hello api')
})

// const db = require('./src/db/db')
// const Produit = require('./src/models/Produit')
// db.connexion()
// const produits = [
//     { name : "AC1 Phone1", type : "phone", price : 200.05, rating : 3.8,warranty_years : 1, available : true },
//     { name : "AC2 Phone2", type : "phone", price : 147.21, rating : 1,warranty_years : 3, available : false },
//     { name : "AC3 Phone3", type : "phone", price : 150, rating : 2,warranty_years : 1, available : true },
//     { name : "AC4 Phone4", type : "phone", price : 50.20, rating : 3,warranty_years : 2, available:true}
// ]
// Produit.insertMany(produits).then(() => console.log('Produits ajoutés')).catch(err => console.log(err))

server.listen(port, () => {
    console.log(`Notre app tourne sur http://localhost:${port}`)
})

module.exports = { io }