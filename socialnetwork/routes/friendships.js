const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Mostrar amistades');
});
  
module.exports = router;

const FriendshipController = require('../controllers/FriendshipController');

router.post('/', FriendshipController.addFriendship);
router.delete('/:userId1/:userId2', FriendshipController.deleteFriendship);
router.get('/:userId/feed', FriendshipController.getFeed);

module.exports = router;