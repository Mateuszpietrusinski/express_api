const Order = require('../../../Models/orders.model');
const errorsHelper = require('../../../Helpers/errors');
const mongoose = require('mongoose');

exports.post = async (req, res, next) => {
    // Checking Product existing
    const productExist = await Product.findById(req.body.productId)
        .then(result => {
            if (!result) {
                res.status(404).json({
                    message: 'Product not found'
                });
                return 0;
            } else {
                return 1;
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Product not found',
                error: err
            });
            return 0;
        });

    if (productExist) {
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });
        order.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Order Created',
                    createdOrder: {
                        _id: result._id,
                        product: result.product,
                        quantity: result.quantity
                    }
                });
            })
            .catch(err => {
                errorsHelper.catchError(res, err);
            });
    }

};