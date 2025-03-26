const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { connectToMongoDB, getDb } = require('./config/mongodb');
const cookieParser = require('cookie-parser');

// Conectar a MongoDB antes de definir las rutas
connectToMongoDB()
    .then(() => {
        console.log('Base de datos conectada');
    })
    .catch(err => {
        console.error('Error al conectar a MongoDB:', err);
        process.exit(1);
    });


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

app.use('/users', (req, res, next) => {
    if (!req.cookies.token) return res.redirect('/auth/login');
    next();
}, userRoutes);

app.use('/posts', (req, res, next) => {
    if (!req.cookies.token) return res.redirect('/auth/login');
    next();
}, postRoutes);

app.use('/friendships', (req, res, next) => {
    if (!req.cookies.token) return res.redirect('/auth/login');
    next();
}, friendshipRoutes);

app.use('/auth', authRoutes);

// Ruta principal
app.get('/', (req, res) => {
    if (!req.cookies.token) {
        return res.redirect('/auth/login');
    }
    res.redirect('/index');
});

app.get('/auth/login', (req, res) => {
    res.render('login'); 
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

app.get('/index', async (req, res) => {
    if (!req.cookies.token) {
        return res.redirect('/auth/login');
    }
    
    try {
        const db = getDb();
        const publicaciones = await db.collection('Publicaciones')
            .find()
            .sort({ createdAt: -1 })
            .toArray();
            
        res.render('index', { 
            publicaciones,
            user: req.user // Pasa el usuario a la vista
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).render('error', { message: 'Error al cargar publicaciones' });
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