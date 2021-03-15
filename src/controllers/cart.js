const Cart = require('../models/cart');


exports.addItemToCart = (req, res) => {

    //res.status(200).json({ message: 'cart'})

    Cart.findOne({ user: req.user._id })
        .exec((error, cart) => {
            if(error) return res.status(400).json({ error });
            if(cart) {
                //if cart already exists update it

                const product = req.body.items.product;
                const item = cart.items.find(c => c.product == product);
                let condition, action;

                if(item){
                    condition = { user: req.user._id, "items.product": product };
                    action = {
                        '$set': {
                            'items.$': {
                                ...req.body.items,
                                quantity: item.quantity + req.body.items.quantity
                            }
                        }
                    }
                }else{
                    condition = { user: req.user._id }
                    action = {
                        '$push': {
                            'items': req.body.items
                        }
                    }
                }
                Cart.findOneAndUpdate(condition, action)
                    .exec((error, _cart) => {
                    if(error) return res.status(400).json({ error });
                    if(_cart){
                        return res.status(201).json({ cart: _cart });
                    }
                })

            }else{
                //if cart doesnt exist
                const cart = new Cart({
                    user: req.user._id,
                    items: [req.body.items]
                });
                cart.save((error, cart) => {
                    if(error) return res.status(400).json({ error });
                    if(cart){
                        return res.status(201).json({ cart });
                    }
                })
            }
        })
}