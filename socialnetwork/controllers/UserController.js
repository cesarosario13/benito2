const mongodb = require('../config/mongodb');

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

    static getUsers() {
        return new Promise((resolve, reject) => {
            try {
                console.log('Obteniendo la instancia de la base de datos...');
                const db = mongodb.getDb();
                console.log('Instancia de la base de datos obtenida:', db);

                console.log('Accediendo a la colección "Usuarios"...');
                const usuariosCollection = db.collection('Usuarios');
                console.log('Colección "Usuarios" obtenida:', usuariosCollection);

                console.log('Buscando usuarios en la colección...');
                usuariosCollection.find().toArray((err, usuarios) => {
                    if (err) {
                        console.error('Error al buscar usuarios:', err);
                        reject(new Error('Error obteniendo usuarios: ' + err.message));
                    } else {
                        console.log('Usuarios encontrados:', usuarios);
                        resolve(usuarios);
                    }
                });
            } catch (error) {
                console.error('Error en getUsers:', error);
                reject(new Error('Error obteniendo usuarios: ' + error.message));
            }
        });
    }
}

module.exports = UserController;