/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the model or schema for a category, it holds the structure
             of a category object, and its parameters / variables.
 */

//libraries
const mongoose = require('mongoose');


//create a schema for all categories with the following parameters:
//name, slug, parentId, .....
const categorySchema = new mongoose.Schema({
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
    image: { type: String },
    parentId: {
        type: String
    }
}, { timestamps: true });

//export the module
module.exports = mongoose.model('Category', categorySchema);