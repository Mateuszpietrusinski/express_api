const Order = require('../../../Models/orders.model');
const errorsHelper = require('../../../Helpers/errors');

exports.getSingle = (req, res, next) => {
    Order.findById(req.params.orderId)
        .populate('product', 'name price')
        .then(result => {
            if(!result){
                return res.status(404).json({
                    message: 'Product not found'
                })
            }
            res.status(200).json({
                order: result,
                request: {
                    type: 'GET',
                    url: process.env.url + '/orders'
                }
            })
        })
        .catch(err => {
            errorsHelper.catchError(res, err);
        })
};