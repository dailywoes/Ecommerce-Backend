/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the controller for authenticating admins in api calls.
 */

//class objects
const User = require('../../models/user');

//libraries
const jwt = require('jsonwebtoken');

//This function is responsible for processing an admin signup request, and then
// saving the entry in the database from the information sent via an api request,
// and then forwarding the response from the database.
exports.signup = (req, res) => {
    //check if there is an admin with that email exists, if not create it.
    User.findOne({email: req.body.email})
        .exec((error, user) => {
            //if the admin object with that email exists, user is already registered
            if (user) return res.status(400).json({
                message: 'Admin already registered'
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
                username: Math.random().toString(),
                role: 'admin'
            });

            //save the admin object to the database
            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: 'Something went wrong.'
                    });
                }
                if (data) {
                    return res.status(201).json({
                        message: 'Admin created successfully!'
                    });
                }
            })
        });
}

//This function is responsible for processing an admin signin request via an api
// request, and then forwarding the response from the database.
exports.signin = (req, res) => {
    //check if there is a user with that email exists.
    User.findOne({email: req.body.email})
        .exec((error, user) => {
            //user does not exist
            if (error) return res.status(400).json({message: 'user not found'});

            //user exists
            if (user) {
                //if user password is a match
                if (user.authenticate(req.body.password) && user.role === 'admin') {
                    //create a token that expires in 1 hour
                    const token = jwt.sign({_id: user._id, role: user.role},
                        process.env.JWT_SECRET, {expiresIn: '1h'});
                    //create temp admin data
                    const {_id, firstName, lastName, email, role, fullName} = user;
                    //create a cookie that expires in 1 hour from the token
                    res.cookie('token', token, {expiresIn: '1h'});
                    res.status(200).json({
                        token,
                        user: {_id, firstName, lastName, email, role, fullName}
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

//This function is responsible for processing an admin signout request via an api
// request, and then forwarding the response from the database.
exports.signout = (req, res) => {
    //clear the token from the cache to invalidate the session
    res.clearCookie('token');
    res.status(200).json({message: 'Sign out successfully...!'});
}