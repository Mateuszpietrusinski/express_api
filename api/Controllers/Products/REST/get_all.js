const Product = require('../../../Models/products.model');
const errorsHelper = require('../../../Helpers/errors');
exports.getAll = (req, res, next) => {
    Product.find()
        .select('name price _id productImage')
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: process.env.url + '/products/' + doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            errorsHelper.errorWithMessage(res,err,'Error: Can not get products from database');
        })
};