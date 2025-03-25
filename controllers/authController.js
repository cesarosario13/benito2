const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

// Método existente (login)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }

        const token = generateToken(user);
        res.json({ 
            token, // <- El frontend debe guardar este token
            user: { 
              id: user._id, 
              email: user.email 
            } 
          });

        res.json({ 
            token, 
            user: { 
                id: user._id, 
                email: user.email 
            } 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validación básica
        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' });
        }

        // Crear usuario (el hash de password se hace automáticamente en el modelo)
        const user = await User.create({ email, password });
        
        // Respuesta similar al login
        const token = generateToken(user);
        res.json({ 
            token, // <- El frontend debe guardar este token
            user: { 
              id: user._id, 
              email: user.email 
            } 
          });
          
        res.status(201).json({
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (error) {
        // Manejo de errores de MongoDB (ej: email duplicado)
        if (error.code === 11000) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }
        res.status(500).json({ error: 'Error en el servidor' });
    }
};