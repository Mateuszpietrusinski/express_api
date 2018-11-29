const Product = require('../../../Models/products.model');
const errorsHelper = require('../../../Helpers/errors');
exports.getSingle = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('- __v')
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry found for provided Id'
                });
            }
        })
        .catch(err => {
            errorsHelper.errorWithMessage(res,err,'Error: Can not get products from database');
        })
};