/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the controller for executing product functions in api calls.
 */

//class objects
const Product = require('../models/product');
const Category = require('../models/category');

//libraries
const shortid = require('shortid');
const slugify = require("slugify");

//This function is responsible for creating a product entry in the database
//from the information sent via an api request, and the forwarding the response
//from the database
exports.createProduct = (req, res) => {
    let images = [];

    //separate the request into individual variables
    const {name, price, quantity, desc, category} = req.body;

    //if the files length in the request is > 0, then
    //there are images associated with the product
    if (req.files.length > 0) {
        //map the images to a variable

        images = req.files.map((file) => {
            return {image: file.filename};
        });
    }

    //create a product object from the product schema out of the request variables
    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        desc,
        images,
        category,
        createdBy: req.user._id
    });

    //save the product object to the database
    product.save((error, product) => {
        if (error) return res.status(400).json({error});
        if (product) {
            res.status(201).json({product, files: req.files});
        }
    });
};

exports.getProductsBySlug = (req, res) => {
    const {slug} = req.params;
    Category.findOne({slug: slug})
        .exec((error, category) => {
            if (error) {
                return res.status(400).json({req});
            }
            if (category) {
                Product.find({category: category._id})
                    .exec((error, products) => {
                        res.status(200).json({
                            products,
                            productsByPrice: {
                                under50: products.filter(product => product.price <= 50),
                                under100: products.filter(product => product.price > 50 && product.price <= 100),
                                under250: products.filter(product => product.price > 100 && product.price <= 250)
                            }
                        });
                    })
            }
        })
}
