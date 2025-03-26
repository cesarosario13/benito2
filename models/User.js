const { getDB } = require('../config/mongodb');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

class User {
    static collection() {
        return getDB().collection('Usuarios'); 
    }

    static async create({ email, password, username }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            email,
            username,
            password: hashedPassword,
            createdAt: new Date()
        };
        
        const result = await this.collection().insertOne(newUser);
        return {
            _id: result.insertedId,
            ...newUser
        };
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