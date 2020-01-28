const mongoose = require('../config/db');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Name: {
        type: String
    },
    Birthdate: {
        type: Date
    },
    Password: { //TODO: Add bcrypt hash
        type: String
    },
    Role: {
        type: String,
        enum: ['User', 'Administrator'],
        default: 'User'
    }
    //TODO: Add link to Specifications Schema
})

const User = mongoose.model('User', userSchema);

module.exports = User