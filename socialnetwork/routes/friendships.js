const express = require('express');
const router = express.Router();
const FriendshipController = require('../controllers/FriendshipController');


router.post('/', function (req, res, next) {
    FriendshipController.addFriendship(req)
        .then((nuevaAmistad) => {
            res.status(201).send(nuevaAmistad); 
        })
        .catch((error) => {
            res.status(400).json({ message: error.message }); 
        });
});


router.delete('/:userId1/:userId2', function (req, res, next) {
    FriendshipController.deleteFriendship(req)
        .then(() => {
            res.status(204).send(); 
        })
        .catch((error) => {
            res.status(400).json({ message: error.message });
        });
});


router.get('/:userId/feed', function (req, res, next) {
    FriendshipController.getFeed(req)
        .then((feed) => {
            res.status(200).send(feed); 
        })
        .catch((error) => {
            res.status(500).json({ message: error.message }); 
        });
});

module.exports = router;