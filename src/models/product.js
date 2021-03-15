//libraries
const mongoose = require('mongoose');


//create a schema for all categories with the following parameters:
//name, slug, parentId, .....
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
    desc: {
        type: String,
        required: true,
        trim: true
    },
    images: [
        { image: { type: String } }
    ],
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            review: String
        }
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedAt: Date
}, { timestamps: true });

//export the module
module.exports = mongoose.model('Product', productSchema);