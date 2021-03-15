/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the controller for authenticating users in api calls.
 */

//class objects
const User = require('../models/user');

//libraries
const jwt = require('jsonwebtoken');

//a function for user sign up processing
exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            //if the user object with that email exists, user is already registered
            if(user) return res.status(400).json({
                message: 'User already registered'
            });
            //separate the request into individual variables
            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;
            //create a user object from the user schema out of the request variables
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString()
            });

            _user.save((error, data) => {
                if(error){
                    return res.status(400).json({
                        message: 'Something went wrong.'
                    });
                }

                if(data){
                    return res.status(201).json({
                        message: 'User created successfully!'
                    });
                }
            })
        });
}

//a function for user sign in processing
exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if(error) return res.status(400).json({ error });
            if(user){
                if(user.authenticate(req.body.password)){
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    res.status(200).json({
                        token,
                        user: {
                            _id, firstName, lastName, email, role, fullName
                        }
                    });
                }else{
                    return res.status(400).json({
                        message: 'Invalid Password'
                    });
                }
            }else{
                return res.status(400).json({ message: 'something went wrong' });
            }
        });
}
