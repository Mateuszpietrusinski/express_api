const Product = require('../../../Models/products.model');
const errorsHelper = require('../../../Helpers/errors');
exports.delete = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            errorsHelper.errorWithMessage(res, err, 'Product was\'t deleted');
        })

};