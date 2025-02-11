class PostController {
    static posts = [];


    static addPost(req, res) {
        const { id, title, description, userId } = req.body;


        if (!id || !title || !description || !userId) {
            return res.status(400).json({ message: 'Faltan datos requeridos: id, titulo, descripcion, userId' });
        }

  
        const newPost = { id, title, description, userId, comments: [] }; 
        PostController.posts.push(newPost);


        res.status(201).json(newPost);
    }


    static getPosts(req, res) {
        res.json(PostController.posts);
    }

    static editPost(req, res) {
        const { id } = req.params; 
        const { title, description } = req.body; 


        const post = PostController.posts.find(p => p.id === id);
        if (!post) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }


        if (title) post.title = title;
        if (description) post.description = description;

        res.json(post); 
    }


    static deletePost(req, res) {
        const { id } = req.params; 

        const index = PostController.posts.findIndex(p => p.id === id);
        if (index === -1) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }

        PostController.posts.splice(index, 1);

        res.status(204).send(); 
    }


    static addComment(req, res) {
        const { id } = req.params; 
        const { comment } = req.body; 

        if (!comment) {
            return res.status(400).json({ message: 'El comentario es requerido' });
        }


        const post = PostController.posts.find(p => p.id === id);
        if (!post) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }


        post.comments.push(comment);

        res.status(201).json(post);
    }


    static getPostComments(req, res) {
        const { id } = req.params; 


        const post = PostController.posts.find(p => p.id === id);
        if (!post) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }

        res.json(post.comments);
    }
}

module.exports = PostController;