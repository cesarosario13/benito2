class UserController {
    static users = [];

    static addUser(req, res) {
        const { id, name, email } = req.body;
        const newUser = { id, name, email, posts: [], friends: [] };
        UserController.users.push(newUser);
        res.status(201).send('Usuario creado');
    }

    static editUser(req, res) {
        const { id } = req.params;
        const { name, email } = req.body;
        const user = UserController.users.find(u => u.id === id);
        if (user) {
            user.name = name;
            user.email = email;
            res.send('Usuario actualizado');
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    }

    static deleteUser(req, res) {
        const { id } = req.params;
        UserController.users = UserController.users.filter(u => u.id !== id);
        res.send('Usuario eliminado');
    }

    static getUserPosts(req, res) {
        const { id } = req.params;
        const user = UserController.users.find(u => u.id === id);
        if (user) {
            res.render('user', { user });
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    }
}

module.exports = UserController;