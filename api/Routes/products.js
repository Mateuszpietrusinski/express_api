const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../Middleware/check-auth');
// Multer functions
// files upload

const multer = require('multer');
// Multer config
const multerOptions = {
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './uploads/');
        },
        filename: (req, file, callback) => {
            callback(null, new Date().toISOString().replace(/:/g, '-') +'-name-'+ file.originalname);
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 8
    },
    fileFilter: (req, file, callback) => {
        file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ? callback(null, true) : callback(null, false);
    }
};
// Multer upload final config
const upload = multer({
    storage: multerOptions.storage,
    limits: multerOptions.limits,
    fileFilter: multerOptions.fileFilter,
});

//Mongo models
const Product = require('../Models/products.model');
//Helpers
const errorsHelper = require('../Helpers/errors');
router.get('/', (req, res, next) => {
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
            res.status(500).json({
                Message: 'Error: Can not get products from database',
                Error: err
            })
        })
});

router.post('/',checkAuth, upload.single('productImage'), async (req, res, next) => {
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
            res.status(500).json({
                error: 'Error: Can not save product to database'
            });
        });

});

router.get('/:productId', (req, res, next) => {
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
            res.status(500).json({
                error: 'Error: Can not get products from database'
            })
        })
});

router.patch('/:productId',checkAuth, (req, res, next) => {
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
});

router.delete('/:productId', checkAuth, (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: 'Deleted product!'
    });
    Product.remove({_id: id})
        .then(doc => {
            res.status(200).json(doc)
        })

});

module.exports = router;