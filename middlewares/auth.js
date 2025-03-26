const { verifyToken } = require('../utils/jwt');

const authenticate = (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Acceso no autorizado' });
        }

        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error en autenticación:', error);
        res.status(401).json({ 
            error: 'Token inválido',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = authenticate;