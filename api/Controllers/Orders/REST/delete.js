const Order = require('../../../Models/orders.model');
const errorsHelper = require('../../../Helpers/errors');

exports.delete = (req, res, next) => {
    Order.remove(req.params.orderId)
        .then(() => {
            res.status(200).json({
                message: 'Order deleted',
                request: {
                    type: 'GET',
                    url: process.env.url + '/orders',
                    body: {
                        productId: "ID",
                        quantity: "Number"
                    }
                }
            })
        })
        .catch(err => {
            errorsHelper.catchError(res, err);
        })
};