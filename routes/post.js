const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const authenticate = require('../middlewares/auth');

router.post('/', authenticate, PostController.addPost);
router.put('/:id', authenticate, PostController.editPost);
router.delete('/:id', authenticate, PostController.deletePost);

router.get('/', PostController.getPosts); 
router.get('/:id/comments', PostController.getPostComments);

router.get('/publicaciones', (req, res) => {
    res.redirect('/'); // Redirige a la página principal
});

router.post('/', function (req, res, next) {
    PostController.addPost(req)
        .then((nuevoPost) => {
            res.status(201).json(nuevoPost); 
        })
        .catch((error) => {
            res.status(400).json({ message: error.message }); 
        });
});


router.get('/', function (req, res, next) {
    PostController.getPosts()
        .then((posts) => {
            res.status(200).json(posts); 
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
});

router.get('/:id', function (req, res, next) {
    PostController.getPostById(req.params.id)
        .then((post) => {
            res.status(200).render('postTime', { post }); // 
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
});

router.put('/:id', function (req, res, next) {
    PostController.editPost(req)
        .then((postActualizado) => {
            res.status(200).json(postActualizado); 
        })
        .catch((error) => {
            res.status(400).json({ message: error.message }); 
        });
});


router.delete('/:id', function (req, res, next) {
    PostController.deletePost(req)
        .then(() => {
            res.status(204).send(); 
        })
        .catch((error) => {
            res.status(400).json({ message: error.message });
        });
});


router.post('/:id/comments', function (req, res, next) {
    PostController.addComment(req)
        .then((postConComentario) => {
            res.status(201).json(postConComentario); 
        })
        .catch((error) => {
            res.status(400).json({ message: error.message }); 
        });
});


router.get('/:id/comments', function (req, res, next) {
    PostController.getPostComments(req)
        .then((comentarios) => {
            res.status(200).json(comentarios); 
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
});

// Ruta para manejar el envío del formulario
router.post('/', async (req, res) => {
    try {
        const db = getDb();
        const publicacionesCollection = db.collection('Publicaciones');

        // Crear la nueva publicación
        const nuevaPublicacion = {
            title: req.body.title,
            description: req.body.description,
            createdAt: new Date(), // Guardar la hora de creación
        };

        // Insertar la publicación en la colección
        await publicacionesCollection.insertOne(nuevaPublicacion);

        // Redirigir a la página principal después de guardar
        res.redirect('/');
    } catch (error) {
        console.error('Error al guardar la publicación:', error);
        res.status(500).render('error', { message: 'Error al guardar la publicación' });
    }
});

module.exports = router;