class PostController {
    static posts = [];

    static addPost(req, res) {
        const { id, title, description, url, userId } = req.body;
        const newPost = { id, title, description, url, userId, comments: [] };
        PostController.posts.push(newPost);
        res.status(201).send('Publicación creada');
    }

    static editPost(req, res) {
        const { id } = req.params;
        const { title, description, url } = req.body;
        const post = PostController.posts.find(p => p.id === id);
        if (post) {
            post.title = title;
            post.description = description;
            post.url = url;
            res.send('Publicación actualizada');
        } else {
            res.status(404).send('Publicación no encontrada');
        }
    }

    static deletePost(req, res) {
        const { id } = req.params;
        PostController.posts = PostController.posts.filter(p => p.id !== id);
        res.send('Publicación eliminada');
    }

    static addComment(req, res) {
        const { id } = req.params;
        const { comment } = req.body;
        const post = PostController.posts.find(p => p.id === id);
        if (post) {
            post.comments.push(comment);
            res.send('Comentario agregado');
        } else {
            res.status(404).send('Publicación no encontrada');
        }
    }

    static getPostComments(req, res) {
        const { id } = req.params;
        const post = PostController.posts.find(p => p.id === id);
        if (post) {
            res.render('post', { post });
        } else {
            res.status(404).send('Publicación no encontrada');
        }
    }
}

module.exports = PostController;