/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the api route for user authentication api calls.
 */

//class objects
const {validateSignUpRequest, validateSignInRequest, isRequestValid} = require("../validators/auth");
const { signin, signup } = require("../controllers/auth");

//libraries
const express = require('express');
const router = express.Router();

//attach the api paths for sign in and sign up
router.post('/signin', validateSignInRequest, isRequestValid, signin);
router.post('/signup', validateSignUpRequest, isRequestValid, signup);

//export the module
module.exports = router;