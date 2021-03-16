/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the controller for executing category functions in api calls.
 */

//class objects
const category = require('../models/category');

//libraries
const slugify = require('slugify');

//This function is responsible for creating a category entry in the database
//from the information sent via an api request, and the forwarding the response
//from the database
exports.createCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    //sets the image of the category from the image url
    if (req.file) {
        categoryObj.image = process.env.API + '/public/' + req.file.filename;
    }

    //if the requested category has a parent category, set it
    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    //save the category object to the database
    const cat = new category(categoryObj);
    cat.save((error, category) => {
        if (error) return res.status(400).json({message: 'Category already exists'});
        if (category) return res.status(201).json({category});
    });
}

//This function is responsible for getting the categories catalogue from the
// database using the information sent via an api request.
exports.getCategories = (req, res) => {
    //find all category entries in the database
    category.find({})
        .exec((error, categories) => {
            //if no categories exist, return error
            if (error) return res.status(400).json({error});

            //if there are categories, proceed to another function
            //to create a proper hierarchy out of the list.
            if (categories) {
                const categoryList = createCategories(categories);
                return res.status(200).json({categoryList});
            }
        })
}

//This is a function called from getCategories, in order to populate a
// list of categories, and it uses recursion to create a proper parent-
// child hierarchy of categories.
function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;

    //*** refresh on how this works im not exactly sure anymore
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == null)
    } else {
        category = categories.filter(cat => cat.parentId == parentId)
    }
    //loop through the categories, and recursively index its children.
    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parent: cate.parentId,
            children: createCategories(categories, cate._id)
        });
    }
    return categoryList;
}