const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Mostrar publicaciones');
});
  
module.exports = router;

const PostController = require('../controllers/PostController');

router.post('/', PostController.addPost);
router.put('/:id', PostController.editPost);
router.delete('/:id', PostController.deletePost);
router.post('/:id/comments', PostController.addComment);
router.get('/:id/comments', PostController.getPostComments);

module.exports = router;