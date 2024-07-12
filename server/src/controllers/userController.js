const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connexion, deconnexion } = require('../db/db')

const signUp = async (req, res) => {
    await connexion();
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({...req.body, password: hashedPassword})
        const newUser = await user.save()
        const msg = `Utilisateur ${newUser.email} créé avec succès`
        res.status(201).json({message: msg, data: newUser})
    } catch (error) {
        const msg = 'Erreur lors de la création de l\'utilisateur'
        res.status(500).json({message: msg, data: error})
    } finally {
        await deconnexion();
    }
}

const signIn = async (req, res) => {
    await connexion()
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            res.status(401).json({message: 'Email ou mot de passe incorrect'})
        } else {
            const passwordValid = await bcrypt.compare(req.body.password, user.password)
            if(!passwordValid) {
                res.status(401).json({message: 'Email ou mot de passe incorrect'})
            } else {
                const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
                res.status(200).json({message: 'Connexion réussie', token: token})
            }
        }
    } catch (error) {
        res.status(500).json({message: 'Erreur lors de la connexion', data: error})
    } finally {
        await deconnexion();
    }
}

module.exports = { signUp, signIn }