class UserController {
    static users = [];

    static addUser(req) {
        return new Promise((resolve, reject) => {
            const { usuario, nombre, email, telefono, direccion, categoria, proyecto } = req.body;

            // Validar campos obligatorios con mensajes específicos
            if (!usuario) {
                reject({ message: 'El campo "usuario" es obligatorio' });
                return;
            }
            if (!nombre) {
                reject({ message: 'El campo "nombre" es obligatorio' });
                return;
            }
            if (!email) {
                reject({ message: 'El campo "email" es obligatorio' });
                return;
            }

            // Verificar si el email o el usuario ya existen
            const emailExists = UserController.users.some(user => user.email === email);
            const usuarioExists = UserController.users.some(user => user.usuario === usuario);

            if (emailExists) {
                reject({ message: 'El email ya está registrado' });
                return;
            }

            if (usuarioExists) {
                reject({ message: 'El nombre de usuario ya está en uso' });
                return;
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
                friends: []
            };

            UserController.users.push(newUser);
            resolve(newUser);
        });
    }
        
    

    static getUsers() {
        return new Promise((resolve, reject) => {
            resolve(UserController.users);
        });
    }
}

module.exports = UserController;