/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the model or schema for a cart, it holds the structure
             of a cart object, and its parameters / variables for the
             database.
 */

//libraries
const mongoose = require('mongoose');

//create a schema for all categories with the following parameters:
//user, items, and items contains the products, quantities, and prices.
const cartSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    items: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
            quantity: {type: Number, default: 1, required: true},
            price: {type: Number, required: true}
        }
    ]

}, {timestamps: true});

//export the module
module.exports = mongoose.model('Cart', cartSchema);