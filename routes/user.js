const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Ruta para obtener la actividad de un usuario
router.get('/:id/activity', async (req, res) => {
    try {
        const user = await UserController.getUserById(req.params.id); // Obtener usuario por ID
        res.render('userActivity', { user }); // Renderizar la vista 'userActivity.ejs'
    } catch (error) {
        console.error('Error al obtener la actividad del usuario:', error);
        res.status(500).render('error', { message: error.message }); // Renderizar vista de error
    }
});

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await UserController.getUsers(); // Obtener todos los usuarios
        res.render('user', { usuarios }); // Renderizar la vista 'user.ejs' con los usuarios
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).render('error', { message: error.message }); // Renderizar vista de error
    }
});

// Ruta para agregar un nuevo usuario
router.post('/', async (req, res) => {
    try {
        const nuevoUsuario = await UserController.addUser(req.body); // Agregar un nuevo usuario
        res.status(201).json(nuevoUsuario); // Devolver el nuevo usuario en formato JSON
    } catch (error) {
        console.error('Error al agregar el usuario:', error);
        res.status(400).json({ error: true, message: error.message }); // Devolver error en formato JSON
    }
});

router.get('/', async (req, res) => {
    try {
        const usuarios = await UserController.getUsers();
        res.render('user', { usuarios });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).render('error', { message: error.message });
    }
});

router.get('/new', (req, res) => {
    res.render('userForm', { usuario: null }); 
});


router.post('/', async (req, res) => {
    try {
        const nuevoUsuario = await UserController.addUser(req.body);
        res.redirect('/users'); 
    } catch (error) {
        console.error('Error al agregar el usuario:', error);
        res.status(400).render('error', { message: error.message });
    }
});


router.get('/:id/edit', async (req, res) => {
    try {
        const usuario = await UserController.getUserById(req.params.id);
        res.render('userForm', { usuario }); 
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).render('error', { message: error.message });
    }
});


router.post('/:id/update', async (req, res) => {
    try {
        await UserController.updateUser(req.params.id, req.body);
        res.redirect('/users'); 
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(400).render('error', { message: error.message });
    }
});


router.post('/:id/delete', async (req, res) => {
    try {
        await UserController.deleteUser(req.params.id);
        res.redirect('/users'); 
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).render('error', { message: error.message });
    }
});


module.exports = router;