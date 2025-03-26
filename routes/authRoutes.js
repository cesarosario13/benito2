const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Mostrar formulario de login (GET)
router.get('/login', (req, res) => {
    res.render('auth/login', { error: req.query.error });
});

// Procesar login (POST)
router.post('/login', authController.login);

// Mostrar formulario de registro (GET)
router.get('/register', (req, res) => {
    res.render('auth/register', { 
        error: req.query.error,
        success: req.query.success // Asegúrate de pasar success
    });
});

// Procesar registro (POST)
router.post('/register', authController.register);

module.exports = router;