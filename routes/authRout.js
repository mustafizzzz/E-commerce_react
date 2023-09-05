const express = require('express');
const { registerController, loginController, adminController, forgetPasswordController, updateProfileController, getOrdersController, allOrderController, orderStatusController } = require('../controllers/authController');
const { isAdmin, requireSignin } = require('../middleware/authMiddleware');

//router object
const router = express.Router();

//routing

//Register || method:Post
router.post('/register', registerController);

//Login || Post

router.post('/login', loginController);

//Admin Route || get
//router.get('/admin', requireSignin, isAdmin, adminController)

//Protected Route 

//user route
router.get('/user-auth', requireSignin, (req, res) => {
  res.status(200).send({ ok: true })
})

//admin route
router.get('/admin-auth', requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
})

//update profile
router.put('/profile', requireSignin, updateProfileController)


//Forget Password
router.post('/forgot-password', forgetPasswordController)

//orders
router.get('/orders', requireSignin, getOrdersController)

//all orders for admin
router.get('/all-orders', requireSignin, isAdmin, allOrderController)

//Status Update
router.put('/order-status/:oid', requireSignin, isAdmin, orderStatusController)


module.exports = router;

