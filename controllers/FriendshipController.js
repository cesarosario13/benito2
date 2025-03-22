const PostController = require('./PostController');

class FriendshipController {
    static friendships = []; 

    // Obtener todas las amistades
    static getFriendships() {
        return new Promise((resolve, reject) => {
            resolve(FriendshipController.friendships); // Devuelve la lista de amistades
        });
    }

    // Agregar una nueva amistad
    static addFriendship(req) {
        return new Promise((resolve, reject) => {
            const { userId1, userId2 } = req.body;

            if (!userId1 || !userId2) {
                reject({ message: 'Faltan datos requeridos: userId1, userId2' });
            } else {
                // Verificar si la amistad ya existe
                const exists = FriendshipController.friendships.some(f => 
                    (f.userId1 === userId1 && f.userId2 === userId2) ||
                    (f.userId1 === userId2 && f.userId2 === userId1)
                );

                if (exists) {
                    reject({ message: 'La amistad ya existe' });
                } else {
                    // Crear y guardar la nueva amistad
                    const newFriendship = { userId1, userId2 };
                    FriendshipController.friendships.push(newFriendship);
                    resolve({ message: 'Amistad agregada', friendship: newFriendship });
                }
            }
        });
    }

    // Obtener el feed de un usuario (posts de amigos)
    static getFeed(req) {
        return new Promise((resolve, reject) => {
            const { userId } = req.params;

            // Obtener la lista de amigos del usuario
            const friends = FriendshipController.friendships
                .filter(f => f.userId1 === userId || f.userId2 === userId)
                .map(f => (f.userId1 === userId ? f.userId2 : f.userId1));

            // Obtener los posts de los amigos desde PostController
            const feed = PostController.posts
                .filter(p => friends.includes(p.userId)) // Filtrar posts de amigos
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Ordenar por fecha

            resolve(feed);
        });
    }
}

module.exports = FriendshipController;