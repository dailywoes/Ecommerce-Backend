/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the api route for product api calls.
 */

//libraries
const express = require('express');
const shortid = require('shortid');
const multer = require('multer');
const router = express.Router();
const path = require('path');

//class objects
const { createProduct, getProductsBySlug } = require("../controllers/product");
const {requireSignin, adminMiddleware} = require("../middleware");

//This is a prebuilt function from the multer library for storing files
// to a local disk.
const storage = multer.diskStorage({
    //Function to set the file destination
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    //Function to set the file name
    filename: function(req, file, cb){
        cb(null, shortid.generate() + '-' + file.originalname);
    }
});

const upload = multer({ storage });


//attach the api paths for product creation.
router.post('/product/create', requireSignin, adminMiddleware, upload.array('image'), createProduct);
router.get('/product/:slug', getProductsBySlug);

//export the module
module.exports = router;
