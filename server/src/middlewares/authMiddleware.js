const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) return res.status(401).json({message: 'Accès refusé'});
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(400).json({message: 'Token invalide', data: error});
    }
}

module.exports = verifyToken