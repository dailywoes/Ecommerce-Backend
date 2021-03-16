/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the controller for executing cart functions in api calls.
 */

//class objects
const Cart = require('../models/cart');

//This function is responsible for adding an item to a user's cart in the database
//from the information sent via an api request, and the forwarding the response
//from the database
exports.addItemToCart = (req, res) => {
    //find the cart tied to the user currently logged in
    Cart.findOne({user: req.user._id})
        .exec((error, cart) => {
            //no cart exists?
            if (error) return res.status(400).json({error});
            //user cart exists
            if (cart) {
                const product = req.body.items.product;

                //*** CHECK BACK ON HOW THIS WORKS I FORGET
                const item = cart.items.find(c => c.product == product);
                let condition, action;

                if (item) {
                    condition = {user: req.user._id, "items.product": product};
                    action = {
                        '$set': {
                            'items.$': {
                                ...req.body.items,
                                quantity: item.quantity + req.body.items.quantity
                            }
                        }
                    }
                } else {
                    condition = {user: req.user._id}
                    action = {
                        '$push': {
                            'items': req.body.items
                        }
                    }
                }
                Cart.findOneAndUpdate(condition, action)
                    .exec((error, _cart) => {
                        if (error) return res.status(400).json({error});
                        if (_cart) {
                            return res.status(201).json({cart: _cart});
                        }
                    })

            } else {
                //if cart doesnt exist
                const cart = new Cart({
                    user: req.user._id,
                    items: [req.body.items]
                });
                cart.save((error, cart) => {
                    if (error) return res.status(400).json({error});
                    if (cart) {
                        return res.status(201).json({cart});
                    }
                })
            }
        })
}