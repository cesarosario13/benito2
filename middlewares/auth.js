const { verifyToken } = require('../utils/jwt');

const token = req.headers.authorization?.split(' ')[1]; // Elimina la parte de cookies

const authenticate = (req, res, next) => {
    // Busca el token en cookies o headers
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado. Token requerido' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;  // Guarda los datos del usuario en el request
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido o expirado' });
    }
};

module.exports = authenticate;