const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { connectToMongoDB } = require('./config/mongodb');
const cookieParser = require('cookie-parser');

// Conectar a MongoDB antes de definir las rutas
connectToMongoDB()
    .then(() => {
        console.log('Base de datos conectada');
    })


// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));


// Rutas
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const friendshipRoutes = require('./routes/friendships');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');


app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/friendships', friendshipRoutes);
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.render('index');
});

// Función para calcular el tiempo transcurrido
function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
        return `hace ${interval} año${interval > 1 ? 's' : ''}`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return `hace ${interval} mes${interval > 1 ? 'es' : ''}`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return `hace ${interval} día${interval > 1 ? 's' : ''}`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return `hace ${interval} hora${interval > 1 ? 's' : ''}`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return `hace ${interval} minuto${interval > 1 ? 's' : ''}`;
    }
    return `hace ${Math.floor(seconds)} segundo${seconds > 1 ? 's' : ''}`;
}

app.get('/', async (req, res) => {
    try {
        const db = getDb();
        const publicacionesCollection = db.collection('Publicaciones');
        const publicaciones = await publicacionesCollection.find().sort({ createdAt: -1 }).toArray(); // Obtener publicaciones ordenadas por fecha
        res.render('index', { publicaciones }); // Pasar las publicaciones a la vista
    } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
        res.status(500).render('error', { message: 'Error al obtener las publicaciones' });
    }
});

app.use(express.static("public"));

// Hacer la función disponible en las vistas
app.locals.timeSince = timeSince;

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;