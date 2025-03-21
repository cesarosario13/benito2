const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    contenido: { type: String, required: true }, // Contenido de la publicación
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al usuario que creó la publicación
    fechaCreacion: { type: Date, default: Date.now } // Fecha de creación (se asigna automáticamente)
});

module.exports = mongoose.model('Post', postSchema);