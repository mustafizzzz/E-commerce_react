
const { isAdmin, requireSignin } = require('../middleware/authMiddleware');

const { CreateCategoryController, updateCategoryController, getAllCategoryController, singleCategoryController, deleteCategoryController } = require('../controllers/categoryController')



const express = require('express');

const router = express.Router();

//routes

//create category
router.post('/create-category', requireSignin, isAdmin, CreateCategoryController);

//update category
router.put('/update-category/:id', requireSignin, isAdmin, updateCategoryController)

//get all category
router.get('/get-category', getAllCategoryController)

//single category
router.get('/single-category/:slug', singleCategoryController)

//delete category
router.delete('/delete-category/:id', requireSignin, isAdmin, deleteCategoryController)


module.exports = router;