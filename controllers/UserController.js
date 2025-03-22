const mongodb = require('../config/mongodb');
const { getDb, ObjectId } = require('../config/mongodb');

class UserController {
    static addUser(req) {
        return new Promise((resolve, reject) => {
            try {
                if (!req.body) {
                    throw new Error('El cuerpo de la solicitud (req.body) está vacío');
                }

                const { usuario, nombre, email, telefono, direccion, categoria, proyecto } = req.body;

                // Validar campos obligatorios
                if (!usuario || !nombre || !email) {
                    throw new Error('Los campos "usuario", "nombre" y "email" son obligatorios');
                }

                const db = mongodb.getDb();
                const usuariosCollection = db.collection('Usuarios');

                // Verificar si el email o el usuario ya existen
                Promise.all([
                    usuariosCollection.findOne({ email }),
                    usuariosCollection.findOne({ usuario }),
                ])
                    .then(([emailExists, usuarioExists]) => {
                        if (emailExists) {
                            throw new Error('El email ya está registrado');
                        }
                        if (usuarioExists) {
                            throw new Error('El nombre de usuario ya está en uso');
                        }

                        // Crear el nuevo usuario
                        const newUser = {
                            usuario,
                            nombre,
                            email,
                            telefono: telefono || null,
                            direccion: direccion || null,
                            categoria: categoria || 'General',
                            proyecto: proyecto || null,
                            posts: [],
                            friends: [],
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        };

                        // Insertar el usuario en la base de datos
                        return usuariosCollection.insertOne(newUser);
                    })
                    .then(result => {
                        resolve({ ...req.body, _id: result.insertedId });
                    })
                    .catch(error => {
                        reject(new Error('Error agregando usuario: ' + error.message));
                    });
            } catch (error) {
                reject(new Error('Error agregando usuario: ' + error.message));
            }
        });
    }

    static async getUsers() {
        try {
            const db = getDb();
            const usuariosCollection = db.collection('Usuarios');
            const usuarios = await usuariosCollection.find().toArray();
            console.log('Usuarios encontrados:', usuarios); 
            return usuarios;
        } catch (error) {
            console.error('Error obteniendo usuarios:', error);
            throw new Error('Error obteniendo usuarios: ' + error.message);
        }
    }

    static async getUserById(id) {
        try {
            const db = getDb();
            const usuariosCollection = db.collection('Usuarios');
            const usuario = await usuariosCollection.findOne({ _id: new ObjectId(id) });
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }
            return usuario;
        } catch (error) {
            throw new Error('Error obteniendo usuario: ' + error.message);
        }
    }    
}

module.exports = UserController;