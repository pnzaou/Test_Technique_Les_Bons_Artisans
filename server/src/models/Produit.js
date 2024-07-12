const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    price: {type: Number, required: true},
    rating: {type: Number},
    warranty_years: {type: Number, required: true},
    available: {type: Boolean, required: true}
})

module.exports = mongoose.model('Produit', produitSchema)