const express = require('express');
const router = express.Router();
const FriendshipController = require('../controllers/FriendshipController');

// Obtener todas las amistades
router.get('/', (req, res, next) => {
    FriendshipController.getFriendships()
        .then((friendships) => {
            res.status(200).json(friendships); // Envía la lista de amistades como respuesta
        })
        .catch((error) => {
            res.status(500).json({ message: error.message }); // Maneja el error
        });
});

// Agregar una nueva amistad
router.post('/', (req, res, next) => {
    FriendshipController.addFriendship(req)
        .then((newFriendship) => {
            res.status(201).json(newFriendship); // Envía la nueva amistad como respuesta
        })
        .catch((error) => {
            res.status(400).json({ message: error.message }); // Maneja el error
        });
});

// Obtener el feed de un usuario
router.get('/:userId/feed', (req, res, next) => {
    FriendshipController.getFeed(req)
        .then((feed) => {
            res.status(200).json(feed); // Envía el feed como respuesta
        })
        .catch((error) => {
            res.status(500).json({ message: error.message }); // Maneja el error
        });
});

module.exports = router;