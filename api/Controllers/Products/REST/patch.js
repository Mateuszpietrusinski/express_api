const Product = require('../../../Models/products.model');
const errorsHelper = require('../../../Helpers/errors');
exports.patch = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Product.update({_id: id}, {$set: updateOps})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            errorsHelper.catchError(res, err);
        })
};