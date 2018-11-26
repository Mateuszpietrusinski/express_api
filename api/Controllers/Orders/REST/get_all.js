const Order = require('../../../Models/orders.model');
const errorsHelper = require('../../../Helpers/errors');

exports.getAll = (req, res, next) => {
    Order.find()
        .select('_id product quantity')
        .populate('product', 'name price')
        .then(result => {
            const data = result.map(v => {
                return {
                    _id: v._id,
                    product: v.product,
                    quantity: v.quantity,
                    request: {
                        type: 'GET',
                        url: process.env.url + '/orders/' + v._id
                    }
                }
            });
            console.log(req);
            res.status(201).json(data)
        })
        .catch(err => {
            errorsHelper.catchError(res, err);
        })
};