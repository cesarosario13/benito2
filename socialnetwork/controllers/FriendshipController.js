
class FriendshipController {
    static friendships = [];

    static addFriendship(req, res) {
        const { userId1, userId2 } = req.body;
        const newFriendship = { userId1, userId2 };
        FriendshipController.friendships.push(newFriendship);
        res.status(201).send('Solicitud de amistad enviada');
    }

    static deleteFriendship(req, res) {
        const { userId1, userId2 } = req.params;
        FriendshipController.friendships = FriendshipController.friendships.filter(f => 
            !(f.userId1 === userId1 && f.userId2 === userId2)
        );
        res.send('Amistad eliminada');
    }

    static getFeed(req, res) {
        const { userId } = req.params;
        const friends = FriendshipController.friendships
            .filter(f => f.userId1 === userId || f.userId2 === userId)
            .map(f => f.userId1 === userId ? f.userId2 : f.userId1);

        const feed = PostController.posts
            .filter(p => friends.includes(p.userId))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 10);

        res.render('feed', { feed });
    }
}

module.exports = FriendshipController;
