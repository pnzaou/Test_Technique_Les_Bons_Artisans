const mongoose = require('mongoose');
require('dotenv').config();

const connexion = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connexion à la base de données ${db.connection.name} réussie`);
    } catch (error) {
        console.log('Erreur de connexion à la base de données', error);
    }
}

const deconnexion = async () => {
    try {
        await mongoose.disconnect();
        console.log('Déconnexion de la base de données réussie');
    } catch (error) {
        console.log('Erreur de déconnexion de la base de données', error);
    }
}


module.exports = { connexion, deconnexion }