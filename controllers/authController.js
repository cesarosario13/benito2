const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);
        
        if (!user || !(await User.comparePassword(password, user.password))) {
            return res.render('auth/login', { 
                error: 'Email o contraseña incorrectos',
                email // Mantenemos el email ingresado
            });
        }

        const token = generateToken({
            id: user._id,
            email: user.email,
            role: user.role
        });

        // Configurar cookie y redirigir
        res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production'
        }).redirect('/'); // Redirige al index después de login

    } catch (error) {
        console.error('Error en login:', error);
        res.render('auth/login', { 
            error: 'Error en el servidor',
            email: req.body.email
        });
    }
};

exports.register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        
        if (!email || !password) {
            return res.status(400).render('auth/register', {
                error: 'Email y contraseña son requeridos',
                formData: { email, username }
            });
        }

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).render('auth/register', {
                error: 'El email ya está registrado',
                formData: { email, username }
            });
        }

        const userId = await User.create({ email, password, username });
        const token = generateToken({ id: userId, email });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000 // 1 día
        }).redirect('/');
        
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).render('auth/register', {
            error: 'Error en el servidor',
            formData: req.body
        });
    }
};

// Cerrar sesión
exports.logout = (req, res) => {
    res.clearCookie('token').redirect('/auth/login');
};