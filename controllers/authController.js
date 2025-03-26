const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findByEmail(email);
        
        if (!user || !(await User.comparePassword(password, user.password))) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }

        const token = generateToken({
            id: user._id,
            email: user.email
        });

        res.json({ 
            token,
            user: { 
                id: user._id, 
                email: user.email
            } 
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

exports.register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' });
        }

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        const newUser = await User.create({ email, password, username });
        
        const token = generateToken({
            id: newUser._id,
            email: newUser.email
        });

        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username
            }
        });

    } catch (error) {
        console.error('Error en registro:', error);
        
        if (error.code === 11000) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }
        
        res.status(500).json({ error: 'Error en el servidor' });
    }
};