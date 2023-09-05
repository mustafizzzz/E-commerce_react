const colors = require('colors')
const categoryModal = require('../models/categoryModal');
const slugify = require('slugify');

const CreateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: "Name is required in create category"
      })
    }
    const existingCategory = await categoryModal.findOne({ name })

    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exist"
      })
    }
    const category = await new categoryModal({ name, slug: slugify(name) }).save()
    console.log("category added".bgGreen.white);
    res.status(201).send({
      success: true,
      message: "category added via controller",
      category
    })
    console.log("category added via controller".bgGreen.red);

  } catch (error) {
    console.log(error);
    console.log("Error in  CreateCategoryController".bgRed.white);

    res.send({
      success: true,
      error,
      message: "Erro in CreateCategoryController"
    })

  }

}

const updateCategoryController = async (req, res) => {
  try {
    //taking out the variables
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModal.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
    console.log("Updated category succesfully".bgGreen.red);
    res.status(200).send({
      success: true,
      message: "Updated category succesfully",
      category
    })

  } catch (error) {
    console.log(error);
    console.log(" in UpdateCategoryController".bgRed.white);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updateCategory catch block"

    })

  }

}

const getAllCategoryController = async (req, res) => {
  try {
    const category = await categoryModal.find({})
    res.status(200).send({
      success: true,
      message: "All categories List",
      category,

    })
    console.log("All categories List".bgGreen.white);

  } catch (error) {
    console.log(erro);
    console.log("erro in getAllCategoryController  catch block".bgRed.white);
    res.status(500).send({
      success: false,
      error,
      message: "erro in getAllCategoryController  catch block"
    })


  }

}

const singleCategoryController = async (req, res) => {
  try {
    const slug = req.params.slug;
    const category = await categoryModal.findOne({ slug })
    res.status(200).send({
      success: true,
      message: "single categories List",
      category,

    })
    console.log("single categories List".bgGreen.white);

  } catch (error) {
    console.log(erro);
    console.log("error in singleCategoryControllercatch block".bgRed.white);
    res.status(500).send({
      success: false,
      error,
      message: "error in singleCategoryController  catch block"
    })


  }

}

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModal.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "delete category successfully",
    })
    console.log("delete category successfully".bgGreen.white);

  } catch (error) {
    console.log(error);
    console.log("error in deleteCategoryController block".bgRed.white);
    res.status(500).send({
      success: false,
      error,
      message: "error in deleteCategoryController  catch block"
    })


  }

}
module.exports = { CreateCategoryController, updateCategoryController, getAllCategoryController, singleCategoryController, deleteCategoryController };