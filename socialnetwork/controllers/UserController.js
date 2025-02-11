class UserController {
    static users = [];

    static addUser(req, res) {
        const { id, name, email } = req.body;

        if (!id || !name || !email) {
            return res.status(400).json({ message: 'Faltan datos requeridos: id, name, email' });
        }

        const newUser = { id, name, email, posts: [], friends: [] };
        UserController.users.push(newUser);


        res.status(201).json(newUser);
    }

    static getUsers(req, res) {
        res.json(UserController.users); 
    }
}

module.exports = UserController;