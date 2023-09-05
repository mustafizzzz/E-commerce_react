const colors = require('colors');
const slugify = require('slugify');
const productModal = require('../models/productModal');
const fs = require('fs');
const categoryModal = require('../models/categoryModal');
var braintree = require("braintree");
const orderModal = require('../models/orderModal');
const dotenv = require('dotenv');

dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({

          error: "Name is required"
        })

      case !description:
        return res.status(500).send({

          error: "decsription is required"
        })

      case !price:
        return res.status(500).send({

          error: "price is required"
        })

      case !category:
        return res.status(500).send({

          error: "category is required"
        })

      case !quantity:
        return res.status(500).send({

          error: "qunatity is required"
        })

      case !shipping:
        return res.status(500).send({

          error: "shipping is required"
        })

      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({

            error: "photo is required  and less the 1mb"
          })
    }

    const products = new productModal({ ...req.fields, slug: slugify(name) })

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path)
      products.photo.contentType = photo.type
    }
    await products.save();

    console.log("Product added successfully".bgGreen.red);
    res.status(201).send({
      success: true,
      message: "Product added successfully",
      products
    })

  } catch (error) {
    console.log(error);
    console.log("error in catch of createProductController".bgRed.blue);
    res.status(500).send({
      success: false,
      error,
      message: "error in catch of createProductController"
    })

  }
}

const getProductController = async (req, res) => {
  try {
    // all products and no photo and some filters
    const products = await productModal.find({}).select("-photo").populate('category').limit(12).sort({ createdAt: -1 })
    console.log("All product fetch".bgGreen.blue);

    res.status(200).send({
      countTotal: products.length,
      success: true,
      message: "All products",
      products,
    })



  } catch (error) {
    console.log(error);
    console.log("error in catch of getProductController".bgRed.green);
    res.status(500).send({
      success: false,
      error,
      message: "error in catch of getProductController"
    })

  }

}

const singleProductController = async (req, res) => {

  try {
    const slug = req.params.slug;
    const product = await productModal.findOne({ slug }).populate("category").select("-photo");
    res.status(200).send({
      success: true,
      message: "single product List",
      product,

    })
    console.log("single product List".bgGreen.white);

  } catch (error) {
    console.log(error);
    console.log("error in singleProductController catch block".bgRed.white);
    res.status(500).send({
      success: false,
      error,
      message: "error in singleProductController  catch block"
    })


  }

}

const deleteProductController = async (req, res) => {
  try {

    await productModal.findByIdAndDelete(req.params.id).select("-photo");
    res.status(200).send({
      success: true,
      message: "delete product",
    })
    console.log("delete product success".bgGreen.grey);

  } catch (error) {
    console.log(error);
    console.log("error in deleteProductController catch block".bgRed.white);
    res.status(500).send({
      success: false,
      error,
      message: "error in deleteProductController  catch block"
    })


  }


}

const photoProductController = async (req, res) => {
  try {
    const product = await productModal.findById(req.params.pid).select("photo");

    console.log("photo product display".bgGreen.red);
    if (product.photo.data) {
      res.set('Content-type', product.photo.contentType);
      return res.status(200).send(product.photo.data)
    }

  } catch (error) {
    console.log(error);
    console.log("error in photoProductController catch block".bgRed.white);
    res.status(500).send({
      success: false,
      error,
      message: "error in photoProductController  catch block"
    })
  }
}

const updateProductController = async (req, res) => {

  try {
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({

          error: "Name is required"
        })

      case !description:
        return res.status(500).send({

          error: "decsription is required"
        })

      case !price:
        return res.status(500).send({

          error: "price is required"
        })

      case !category:
        return res.status(500).send({

          error: "category is required"
        })

      case !quantity:
        return res.status(500).send({

          error: "qunatity is required"
        })

      case !shipping:
        return res.status(500).send({

          error: "shipping is required"
        })

      case photo && photo.size < 10000:
        return res
          .status(500)
          .send({

            error: "photo is required  and less the 1mb"
          })
    }

    const products = await productModal.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields, slug: slugify(name)
      },
      { new: true })

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path)
      products.photo.contentType = photo.type
    }
    await products.save();

    console.log("Product updated successfully".bgGreen.red);
    res.status(201).send({
      success: true,
      message: "Product Updated successfully",
      products
    })

  } catch (error) {
    console.log(error);
    console.log("error in catch of updateProductController".bgRed.blue);
    res.status(500).send({
      success: false,
      error,
      message: "error in catch of updateProductController"
    })

  }

}

const filterProductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModal.find(args);
    res.status(200).send({
      success: true,
      products
    })

  } catch (error) {

    console.log(error);
    console.log("error in filterProductController catch block".bgRed.white);
    res.status(500).send({
      success: false,
      error,
      message: "error in filterProductController  catch block"
    })

  }
}

const productCountController = async (req, res) => {
  try {
    const total = await productModal.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      message: "Get the Estimated Document",
      total
    })

  } catch (error) {

    console.log(error);
    console.log("error in productCountController catch block".bgRed.white);
    res.status(500).send({
      success: false,
      error,
      message: "error in productCountController  catch block"
    })

  }

}

const productlistController = async (req, res) => {
  try {
    const perPage = 6; // to show
    const page = req.params.page ? req.params.page : 1
    const products = await productModal
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Get the pagination product list",
      products
    })

  } catch (error) {

    console.log(error);
    console.log("error in productlistController catch block".bgRed.white);
    res.status(500).send({
      success: false,
      error,
      message: "error in productlistController  catch block"
    })

  }

}

const searchProductController = async (req, res) => {
  try {
    const { keywords } = req.params;

    const results = await productModal.find({
      $or: [
        { name: { $regex: keywords, $options: 'i' } },
        { description: { $regex: keywords, $options: 'i' } },
      ],
    }).select("-photo");
    console.log(results);
    res.json(results);


  } catch (error) {
    console.log("Error in searchProductController catch block".bgRed.green);
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Erro in searchProductController catch block"
    })

  }

}

const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModal.find({
      category: cid,
      _id: { $ne: pid }
    }).select("-photo").limit(5).populate('category');

    res.status(200).send({
      success: true,
      message: "Get the related product in try of relatedProductController",
      products
    })


  } catch (error) {
    console.log("Error in relatedProductController catch block".bgRed.green);
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Erro in relatedProductController catch block"
    })

  }
}

const categoryProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModal.findOne({ slug });
    const products = await productModal.find({ category }).
      select("-photo").populate('category');

    res.status(200).send({
      success: true,
      message: "Get the Category Product in try",
      products
    })



  } catch (error) {

    console.log("Error in categoryProductController catch block".bgRed.green);
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Erro in categoryProductController catch block"
    })

  }
}

//payment controllers 

const brainTreeController = async (req, res) => {
  try {

    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send({
          err
        })
      } else {
        res.send(response);

      }
    });

  } catch (error) {
    console.log("Error in brainTreeController catch block".bgRed.green);
    console.log(error);
  }

}

const brainTreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((item) => {
      total += Math.floor(item.price);
    });

    let newTransaction = gateway.transaction.sale({
      amount: total,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true
      }
    },

      function (err, result) {
        if (result) {
          const order = new orderModal({
            products: cart,
            payment: result,
            buyers: req.user._id,
          }).save();

          res.json({
            ok: true
          })

        } else {
          res.status(500).send(err);

        }
      }
    )


  } catch (error) {
    console.log("Error in brainTreePaymentController catch block".bgRed.green);
    console.log(error);

  }

}



module.exports = { createProductController, getProductController, singleProductController, deleteProductController, photoProductController, updateProductController, filterProductController, productCountController, productlistController, searchProductController, relatedProductController, categoryProductController, brainTreeController, brainTreePaymentController }