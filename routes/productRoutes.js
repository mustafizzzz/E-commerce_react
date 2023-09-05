const express = require('express');
const { requireSignin, isAdmin } = require('../middleware/authMiddleware');
const { createProductController, getProductController, singleProductController, deleteProductController, photoProductController, updateProductController, filterProductController, productCountController, productlistController, searchProductController, relatedProductController, categoryProductController, brainTreeController, brainTreePaymentController } = require('../controllers/productController');

const formidable = require('express-formidable');

const router = express.Router();

//Routes

router.post('/create-product', requireSignin, isAdmin, formidable(), createProductController)


//get all products
router.get('/get-product', getProductController)

//single category
router.get('/single-product/:slug', singleProductController)

//get photo 
router.get('/product-photo/:pid', photoProductController)

//delete category
router.delete('/delete-product/:id', requireSignin, isAdmin, deleteProductController)

//update product
router.put('/update-product/:pid', requireSignin, isAdmin, formidable(), updateProductController)

//filter Routes
router.post('/product-filterd', requireSignin, filterProductController)

//Count Product
router.get('/product-count', productCountController)

//product per page
router.get('/product-perpage/:page', productlistController)

//search product
router.get('/search/:keywords', searchProductController)

//similar product
router.get('/related-product/:pid/:cid', relatedProductController)

//category wise product
router.get('/product-category/:slug', categoryProductController)

//payments
router.get('/baraintree/token', brainTreeController)

router.post('/baraintree/payment', requireSignin, brainTreePaymentController)







module.exports = router;