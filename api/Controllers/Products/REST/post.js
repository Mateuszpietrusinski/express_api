const mongoose = require('mongoose');
const Product = require('../../../Models/products.model');
const errorsHelper = require('../../../Helpers/errors');
exports.post = async (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });

    const dbResponse = await product
        .save()
        .then((result) => {
            const response = {
                count: result.length,
                products: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: process.env.url + '/products/' + result._id
                    }
                }
            };
            res.status(201).json(response);
        })
        .catch(err => {
            errorsHelper.errorWithMessage(res,err,'Error: Can not save product to database')
        });

};