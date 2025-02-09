var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Mostrar usuarios');
});

module.exports = router;


const UserController = require('../controllers/UserController');

router.post('/', UserController.addUser);
router.put('/:id', UserController.editUser);
router.delete('/:id', UserController.deleteUser);
router.get('/:id/posts', UserController.getUserPosts);

module.exports = router;
