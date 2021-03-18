const Category = require('../../models/category');
const Product = require('../../models/product');

exports.initialData = async (req, res) => {

    const categories = await Category.find({}).exec();
    const products = await Product.find({})
        .select('_id name price quantity slug desc images category')
        .populate({path: 'category', select: '_id name'})
        .exec();

    res.status(200).json({
        categories: createCategories(categories),
        products
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
