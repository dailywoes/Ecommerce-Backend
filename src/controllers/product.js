const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require("slugify");


exports.createProduct = (req, res) => {
    //res.status(200).json({ file: req.files, body: req.body })

    const {
        name, price, quantity, desc, category
    } = req.body;

    let images = [];

    if(req.files.length > 0){
        images = req.files.map((file) => {
            return { image: file.location };
        });
    }

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

    product.save((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
            res.status(201).json({ product, files: req.files });
        }
    });
};

