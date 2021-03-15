
//class objects
const { createProduct } = require("../controllers/product");
const {requireSignin, adminMiddleware} = require("../middleware/index");

//libraries
const express = require('express');
const shortid = require('shortid');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function(req, file, cb){
        cb(null, shortid.generate() + '-' + file.originalname);
    }
});

const upload = multer({ storage });


//attach the api paths for category creation, category listings, .....
router.post('/product/create', requireSignin, adminMiddleware, upload.array('image'), createProduct);
//router.get('/category/getcategory', getCategories);

//export the module
module.exports = router;
