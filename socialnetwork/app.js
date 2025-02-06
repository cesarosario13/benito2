const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rutas
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const friendshipRoutes = require('./routes/friendships');

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/friendships', friendshipRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.render('index');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});