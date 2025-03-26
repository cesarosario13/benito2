const { getDb } = require('../config/mongodb');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

class User {
    static collection() {
        return getDb().collection('Usuarios'); 
    }

    static async create({ email, password, username }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await this.collection().insertOne({
            email,
            username,
            password: hashedPassword,
            createdAt: new Date(),
            role: 'user'
        });
        return result.insertedId;
    }

    static async makeAdmin(userId) {
        await this.collection().updateOne(
            { _id: new ObjectId(userId) },
            { $set: { role: 'admin' } }
        );
    }

    static async findByEmail(email) {
        return await this.collection().findOne({ 
            email: { $regex: new RegExp(`^${email}$`, 'i') } 
        });
    }

    static async comparePassword(candidatePassword, hashedPassword) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }

    static async findById(id) {
        return await this.collection().findOne({ 
            _id: new ObjectId(id) 
        });
    }
}

module.exports = User;