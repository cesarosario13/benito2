class UserController {
    static users = [];

    static addUser(req) {
        return new Promise((resolve, reject) => {
            const { id, name, email } = req.body;

            if (!id || !name || !email) {
                reject({ message: 'Faltan datos requeridos: id, name, email' });
            } else {
                const newUser = { id, name, email, posts: [], friends: [] };
                UserController.users.push(newUser);
                resolve(newUser);
            }
        });
    }

    static getUsers() {
        return new Promise((resolve, reject) => {
            resolve(UserController.users);
        });
    }
}

module.exports = UserController;