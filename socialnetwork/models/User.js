const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    usuario: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, default: null },
    direccion: { type: String, default: null },
    categoria: { type: String, default: 'General' },
    proyecto: { type: String, default: null },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // Referencia a las publicaciones
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Referencia a los amigos
    createdAt: { type: Date, default: Date.now } // Fecha de creación
});

module.exports = mongoose.model('User', userSchema);