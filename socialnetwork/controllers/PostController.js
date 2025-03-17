class PostController {
    static posts = [];

    static addPost(req) {
        return new Promise((resolve, reject) => {
            const { id, title, description, userId } = req.body;

            if (!id || !title || !description || !userId) {
                reject({ message: 'Faltan datos requeridos: id, titulo, descripcion, userId' });
            } else {
                const newPost = { id, title, description, userId, comments: [] };
                PostController.posts.push(newPost);
                resolve(newPost);
            }
        });
    }

    static getPosts() {
        return new Promise((resolve, reject) => {
            resolve(PostController.posts);
        });
    }

    static editPost(req) {
        return new Promise((resolve, reject) => {
            const { id } = req.params;
            const { title, description } = req.body;

            const post = PostController.posts.find(p => p.id === id);
            if (!post) {
                reject({ message: 'Publicación no encontrada' });
            } else {
                if (title) post.title = title;
                if (description) post.description = description;
                resolve(post);
            }
        });
    }

    static deletePost(req) {
        return new Promise((resolve, reject) => {
            const { id } = req.params;

            const index = PostController.posts.findIndex(p => p.id === id);
            if (index === -1) {
                reject({ message: 'Publicación no encontrada' });
            } else {
                PostController.posts.splice(index, 1);
                resolve();
            }
        });
    }

    static addComment(req) {
        return new Promise((resolve, reject) => {
            const { id } = req.params;
            const { comment } = req.body;

            if (!comment) {
                reject({ message: 'El comentario es requerido' });
            } else {
                const post = PostController.posts.find(p => p.id === id);
                if (!post) {
                    reject({ message: 'Publicación no encontrada' });
                } else {
                    post.comments.push(comment);
                    resolve(post);
                }
            }
        });
    }

    static getPostComments(req) {
        return new Promise((resolve, reject) => {
            const { id } = req.params;

            const post = PostController.posts.find(p => p.id === id);
            if (!post) {
                reject({ message: 'Publicación no encontrada' });
            } else {
                resolve(post.comments);
            }
        });
    }
}

module.exports = PostController;