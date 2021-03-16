/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the class that checks sign up and sign in forms for
             correct input.
 */

//libraries
const {check, validationResult} = require('express-validator');

//check sign up data for correct inputs
exports.validateSignUpRequest = [
    check('firstName')
        .notEmpty()
        .withMessage('First name is required.'),
    check('lastName')
        .notEmpty()
        .withMessage('Last name is required.'),
    check('email')
        .isEmail()
        .withMessage('Valid email is required.'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long.')
]

//check sign in data for correct inputs
exports.validateSignInRequest = [
    check('email')
        .isEmail()
        .withMessage('Valid email is required.'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long.')
]

//check if the request is valid by checking the length of the error
//returned by the response, if 0 theres no error.
exports.isRequestValid = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res.status(400).json({error: errors.array()[0].msg})
    }
    next();
}
