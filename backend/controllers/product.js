import Product from "../models/product";

export const addProduct = async (req, res) => {

    const {name, price, category, stock, image, userId} = req.body;

    const product = new Product({
        name,
        price,
        stock,
        category,
        picture: image,
        sellerId: userId
    });

    await Product.create(product).then(product => {
        res.json({
            status: 'success',
            data: product
        });
    }).catch(err => {
        res.json({
            status: 'error',
            message: err
        });
    });

}


export const fetchAllProducts = (req, res) => {
    Product.find({}).then(products => {
        res.json({
            status: 'success',
            products: products
        });
    }).catch(err => {
        res.json({
            status: 'error',
            message: err
        });
    });
}

export const fetchSellerProducts = (req, res) => {
    const {userId} = req.body;
    Product.find({sellerId: userId}).then(products => {
        res.json({
            status: 'success',
            products: products
        });
    }).catch(err => {
        res.json({
            status: 'error',
            message: err
        });
    });
}

export const fetchProductDetails = (req, res) => {
    const {productId} = req.query;

    Product.findById(productId).then(product => {
        res.json({
            status: 'success',
            product: product
        });
    }).catch(err => {
        res.json({
            status: 'error',
            message: err
        });
    });
}

export const deleteProduct = (req, res) => {
    const {_id, userId} = req.body;

    Product.findOneAndDelete({_id, sellerId: userId}).then(product => {
        res.json({
            status: 'success',
            message: 'Product deleted successfully'
        });
    }).catch(err => {
        res.json({
            status: 'error',
            message: err
        });
    });

}

export const updateProduct = (req, res) => {
    const {_id, userId, name, price, category, stock, image} = req.body;


    Product.findOneAndUpdate({_id, sellerId: userId}, {
       $set: {
           name,
           price,
           category,
           stock,
           picture: image
       }
    }).then(product => {
        res.json({
            status: 'success',
            message: 'Product updated successfully'
        });
    }).catch(err => {
        res.json({
            status: 'error',
            message: err
        });
    });
}

