/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the model or schema for a product, it holds the structure
             of a product object, and its parameters / variables for the
             database.
 */

//libraries
const mongoose = require('mongoose');

//create a schema for all products with the following parameters:
//name, slug (unique name), price, quantity, description, images, reviews, category, etc.
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
    images: [
        {image: {type: String}}
    ],
    reviews: [
        {
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            review: String
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedAt: Date
}, {timestamps: true});

//export the module
module.exports = mongoose.model('Product', productSchema);