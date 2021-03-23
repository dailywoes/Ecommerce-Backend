/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description:
 */

//libraries
const mongoose = require('mongoose');

//create a schema for all categories with the following parameters:
//user, items, and items contains the products, quantities, and prices.
const pageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
    banners: [
        {
            image: {type: String},
            navigateTo: { type: String}
        }
    ],
    products: [
        {
            image: {type: String},
            navigateTo: {type: String}
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
    }

}, {timestamps: true});

//export the module
module.exports = mongoose.model('Page', pageSchema);