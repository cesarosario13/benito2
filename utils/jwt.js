const jwt = require('jsonwebtoken');

function generateToken(user) {
    if (!user || !user.id || !user.email) {
        throw new Error('Datos de usuario incompletos para generar token');
    }

    const payload = {
        sub: user.id,
        email: user.email,
        role: user.role || 'user'
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
}

module.exports = { generateToken };
