/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the api route for cart api calls.
 */

//libraries
const express = require('express');
const router = express.Router();

//class objects
const {addItemToCart} = require("../controllers/cart");
const {requireSignin, userMiddleware} = require("../middleware/index");

//attach the api paths for category creation, category listings, .....
router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart);

//export the module
module.exports = router;
