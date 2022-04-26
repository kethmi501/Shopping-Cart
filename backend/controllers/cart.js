import Cart from "../models/cart";

export const addToCart = (req, res) => {
    const {userId, productId} = req.body;

    Cart.findOne({userId}, async (err, cart) => {
        if (err) {
            return res.status(400).json({
                error: "Could not find cart"
            });
        }
        if (!cart) {
            const newCart = new Cart({
                userId,
                productArray: [productId]
            });

            await Cart.create(newCart, (err, cart) => {
                if (err) {
                    return res.status(400).json({
                        error: "Could not create cart"
                    });
                }
                return res.json(cart);
            })
        } else {
            cart.productArray.push(productId);
            cart.save((err, cart) => {
                if (err) {
                    return res.status(400).json({
                        error: "Could not save cart"
                    });
                }
                return res.json(cart);
            });
        }
    });

};

export const fetchCart = (req, res) => {
    const {userId} = req.body;

    Cart.findOne({userId}, (err, cart) => {
        if (err) {
            return res.status(400).json({
                error: "Could not find cart"
            });
        }
        if (!cart) {
            return res.status(400).json({
                error: "Could not find cart"
            });
        }
        return res.json(cart);
    });
};

export const deleteFromCart = (req, res) => {
    const {userId, productId} = req.body;

    Cart.findOne({userId}, async (err, cart) => {
        if (err) {
            return res.status(400).json({
                error: "Could not find cart"
            });
        }
        if (!cart) {
            const newCart = new Cart({
                userId,
                productArray: []
            });

            await Cart.create(newCart, (err, cart) => {
                if (err) {
                    return res.status(400).json({
                        error: "Could not update cart"
                    });
                }
                return res.json(cart);
            })
        } else {

            if (cart.productArray.indexOf(productId) !== -1) {
                cart.productArray.splice(cart.productArray.indexOf(productId), 1);
            }

            cart.save((err, cart) => {
                if (err) {
                    return res.status(400).json({
                        error: "Could not update cart"
                    });
                }
                return res.json(cart);
            });
        }
    });
};
