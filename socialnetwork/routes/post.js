const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

router.post('/', PostController.addPost);
router.put('/:id', PostController.editPost);
router.delete('/:id', PostController.deletePost);
router.post('/:id/comments', PostController.addComment);
router.get('/:id/comments', PostController.getPostComments);

module.exports = router;