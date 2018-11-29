const express = require('express');
const router = express.Router();

const checkAuth = require('../Middleware/check-auth');
const productsController = require('../Controllers/Products/products');
const fileUpload = require('../Middleware/multer');
// Multer functions
// files upload


router.get('/', productsController.getAll);

router.post('/',checkAuth, fileUpload.upload.single('productImage'), productsController.post);

router.get('/:productId', productsController.getSingle);

router.patch('/:productId',checkAuth, productsController.patch);

router.delete('/:productId', checkAuth, productsController.delete);

module.exports = router;