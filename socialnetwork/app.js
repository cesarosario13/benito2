const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongodb = require('./config/mongodb');

// Conexión a la base de datos
mongodb.connect()
    .then(() => {
        console.log('Base de datos conectada');
    })
    .catch((err) => {
        console.error('Error conectando a la base de datos:', err);
    });

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Hacer la función disponible en las vistas
app.locals.timeSince = timeSince;

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;