/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the controller for authenticating users in api calls.
 */

//class objects
const User = require('../models/user');

//libraries
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require("shortid");

//This function is responsible for processing a user signup request, and then
// saving the entry in the database from the information sent via an api request,
// and then forwarding the response from the database.
exports.signup = (req, res) => {
    //check if there is a user with that email exists, if not create it.
    User.findOne({email: req.body.email})
        .exec(async(error, user) => {
            //if the user object with that email exists, user is already registered
            if (user) return res.status(400).json({
                message: 'User already registered'
            });
            //separate the request into individual variables
            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;

            const hash_password = await bcrypt.hash(password, 10);

            //create a user object from the user schema out of the request variables
            const _user = new User({
                firstName,
                lastName,
                email,
                hash_password,
                username: shortid.generate()
            });

            //save the user object to the database
            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: 'Something went wrong.'
                    });
                }
                if (data) {
                    return res.status(201).json({
                        message: 'User created successfully!'
                    });
                }
            })
        });
}

//This function is responsible for processing a user signin request via an api
// request, and then forwarding the response from the database.
exports.signin = (req, res) => {
    //check if there is a user with that email exists.
    User.findOne({email: req.body.email})
        .exec((error, user) => {
            //user does not exist
            if (error) return res.status(400).json({error});

            //user exists
            if (user) {
                //if user password is a match
                if (user.authenticate(req.body.password)) {
                    //create a token that expires in 1 hour
                    const token = jwt.sign({_id: user._id, role: user.role},
                        process.env.JWT_SECRET, {expiresIn: '1h'});
                    //create temp user data
                    const {_id, firstName, lastName, email, role, fullName} = user;
                    res.status(200).json({
                        token,
                        user: {
                            _id, firstName, lastName, email, role, fullName
                        }
                    });
                } else {
                    return res.status(400).json({
                        message: 'Invalid Password'
                    });
                }
            } else {
                return res.status(400).json({message: 'something went wrong'});
            }
        });
}
