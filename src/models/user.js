/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the model or schema for a user, it holds the structure
             of a user object, and its parameters / variables for the
             database.
 */

//libraries
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//create a schema for all users with the following parameters:
//firstname, lastname, username, email, hash password, role, etc.
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contactNumber: {type: String},
    profilePicture: {type: String}
}, {timestamps: true});

//generate the hash password from the bcrypt library hash algorithm, from the user password
userSchema.virtual('password')
    .set(function (password) {
        this.hash_password = bcrypt.hashSync(password, 10);
    });

//generate the full name from the user first and last name
userSchema.virtual('fullName')
    .get(function () {
        return `${this.firstName} ${this.lastName}`;
    })

//compare the password to the hash password using the bcrypt library
userSchema.methods = {
    authenticate: async function (password) {
        return await bcrypt.compareSync(password, this.hash_password);
    },
};

//export the module
module.exports = mongoose.model('User', userSchema);