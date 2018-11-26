const express = require('express');
const router = express.Router();
const checkAuth = require('../Middleware/check-auth');
const ordersController = require('../Controllers/Orders/orders');

//Helpers
const errorsHelper = require('../Helpers/errors');
// Handle incoming GET requests to /orders
router.get('/', ordersController.getAll);

router.post('/',checkAuth, ordersController.post);

router.get('/:orderId', ordersController.getSingle);

router.delete('/:orderId',checkAuth, ordersController.deleteOrder);

module.exports = router;