const PostController = require('./PostController'); 

class FriendshipController {
    static friendships = []; 

    static addFriendship(req, res) {
        const { userId1, userId2 } = req.body;

        if (!userId1 || !userId2) {
            return res.status(400).json({ message: 'Faltan datos requeridos: userId1, userId2' });
        }

        const exists = FriendshipController.friendships.some(f => 
            (f.userId1 === userId1 && f.userId2 === userId2) ||
            (f.userId1 === userId2 && f.userId2 === userId1)
        );

        if (exists) {
            return res.status(400).json({ message: 'La amistad ya existe' });
        }

        const newFriendship = { userId1, userId2 };
        FriendshipController.friendships.push(newFriendship);

        res.status(201).json({ message: 'Amistad agregada', friendship: newFriendship });
    }

    static deleteFriendship(req, res) {
        const { userId1, userId2 } = req.params;


        const initialLength = FriendshipController.friendships.length;
        FriendshipController.friendships = FriendshipController.friendships.filter(f => 
            !(f.userId1 === userId1 && f.userId2 === userId2) &&
            !(f.userId1 === userId2 && f.userId2 === userId1)
        );


        if (FriendshipController.friendships.length === initialLength) {
            return res.status(404).json({ message: 'Amistad no encontrada' });
        }

        res.status(204).send(); 
    }

    static getFeed(req, res) {
        const { userId } = req.params;

        const friends = FriendshipController.friendships
            .filter(f => f.userId1 === userId || f.userId2 === userId)
            .map(f => f.userId1 === userId ? f.userId2 : f.userId1);

        const feed = PostController.posts
            .filter(p => friends.includes(p.userId)) 
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 

        res.json(feed); 
    }
}

module.exports = FriendshipController;