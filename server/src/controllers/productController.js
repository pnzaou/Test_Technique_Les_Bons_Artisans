const Produit = require('../models/Produit');
const { connexion, deconnexion } = require('../db/db')
const { io } = require('../../app')

const addProduit = async (req, res) => {
    await connexion();
    try {
        const produit = new Produit(req.body)
        const newProduit = await produit.save()
        io.emit('produitAdded', newProduit)
        res.status(201).json({message: 'Produit ajouté avec succès', data: newProduit})
    } catch (error) {
        res.status(500).json({message: 'Erreur lors de l\'ajout du produit', data: error})
    } finally {
        await deconnexion();
    }
}

const getProduits = async (req, res) => {
    await connexion();
    try {
        const produits = await Produit.find()
        res.status(200).json({message: 'Produits récupérés avec succès', data: produits})
    } catch (error) {
        res.status(500).json({message: 'Erreur lors de la récupération des produits', data: error})
    } finally {
        await deconnexion();
    }
}

const updateProduit = async (req, res) => {
    await connexion();
    try {
        const produit = await Produit.findByIdAndUpdate(req.params.id, req.body, {new: true})
        io.emit('produitUpdated', produit)
        res.status(200).json({message: 'Produit modifié avec succès', data: produit})
    }
    catch (error) {
        res.status(500).json({message: 'Erreur lors de la modification du produit', data: error})
    } finally {
        await deconnexion();
    }
}

const deleteProduit = async (req, res) => {
    await connexion();
    try {
        await Produit.findByIdAndDelete(req.params.id)
        io.emit('produitDeleted', req.params.id)
        res.status(200).json({message: 'Produit supprimé avec succès'})
    } catch (error) {
        res.status(500).json({message: 'Erreur lors de la suppression du produit', data: error})
    } finally {
        await deconnexion();
    }
}

module.exports = {
    getProduits,
    addProduit,
    updateProduit,
    deleteProduit
};