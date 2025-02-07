var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/', UserController.addUser);
router.put('/:id', UserController.editUser);
router.delete('/:id', UserController.deleteUser);
router.get('/:id/posts', UserController.getUserPosts);

module.exports = router;
