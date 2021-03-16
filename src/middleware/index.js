/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the middleware class, for functions that serve
             purposes that are an in-between of other categories, for
             example checking if a user is required to be signed in prior
             to another function being executed, or checking user access.
 */

//libraries
const jwt = require('jsonwebtoken');

//This function checks if the user is signed on, if authorization is required
//for a certain directory of the site.
exports.requireSignin = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
    } else {
        return res.status(400).json({message: 'Authorization required.'});
    }
    next();
};

//This function checks the role of the user signed on, if the role
//is not a user, then an access is denied response is returned
exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(400).json({message: 'User access denied.'})
    }
    next();
};

//This function checks the role of the user signed on, if the role
//is not an admin, then an access is denied response is returned
exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).json({message: 'Access denied.'})
    }
    next();
};