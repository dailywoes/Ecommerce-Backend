/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the api route for admin authentication api calls.
 */

//libraries
const express = require('express');
const router = express.Router();

//class objects
const {initialData} = require('../../controllers/admin/initialData');

//attach the api paths for admin sign in and admin sign up
router.post('/admin/initialdata', initialData);

//export the module
module.exports = router;