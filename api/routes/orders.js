const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//models to db
const Order = require('../Models/orders.model');
const Product = require('../Models/products.model');

//Helpers
const errorsHelper = require('../Helpers/errors');
// Handle incoming GET requests to /orders
router.get('/', (req, res, next) => {
    Order.find()
        .select('_id product quantity')
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
            res.status(201).json(data)
        })
        .catch(err => {
            errorsHelper.catchError(res, err);
        })
});

router.post('/', async (req, res, next) => {
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

});

router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
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
});

router.delete('/:orderId', (req, res, next) => {
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
});

module.exports = router;