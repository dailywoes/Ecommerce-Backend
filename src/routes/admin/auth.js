/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the api route for admin authentication api calls.
 */

//class objects
const {validateSignInRequest, validateSignUpRequest, isRequestValid} = require("../../validators/auth");
const { signin, signup, signout } = require("../../controllers/admin/auth");

//libraries
const express = require('express');
const router = express.Router();
const cors = require('cors');

//attach the api paths for admin sign in and admin sign up
router.post('/admin/signup', validateSignUpRequest, isRequestValid, signup);
router.post('/admin/signin', validateSignInRequest, isRequestValid, signin);
router.post('/admin/signout', signout);

//export the module
module.exports = router;