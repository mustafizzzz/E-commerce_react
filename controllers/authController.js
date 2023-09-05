const { response } = require('express');
const { hashPassword, comparepassword } = require('../helpers/authHelper');
const userModal = require('../models/userModal');
const orderModal = require('../models/orderModal');
const JWT = require('jsonwebtoken');
const colors = require('colors');

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    //validation
    if (!name) {
      return res.send({ message: 'Name is Required' })
    }
    if (!email) {
      return res.send({ message: 'email is Required' })
    }
    if (!password) {
      return res.send({ message: 'password is Required' })
    }
    if (!phone) {
      return res.send({ message: 'phone number is Required' })
    }
    if (!address) {
      return res.send({ message: 'address is Required' })
    }
    if (!answer) {
      return res.send({ message: 'answer is Required' })
    }

    //check user
    const existingUser = await userModal.findOne({ email })
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already register Please Login"

      })
    }

    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModal({ name, email, phone, address, password: hashedPassword, answer }).save();

    res.status(200).send({
      success: true,
      message: "User Registered Sucessfully",
      user
    })
    console.log("Registered Successfully".bgCyan.white);

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration".bgRed.white,
      error
    })

  }

}

//Post login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validate
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password"
      })
    }
    //check user
    const user = await userModal.findOne({ email });
    if (!user) {
      console.log('Email is not register'.bgRed.white);
      return res.status(404).send({
        success: false,
        message: 'Email is not register'
      })
    }
    //compare the password
    const match = await comparepassword(password, user.password);
    if (!match) {
      console.log("Invalid password".bgRed.white);
      return res.status(200).send({
        success: false,
        message: 'Invalid password'
      })

    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET,
      { expiresIn: "7d" });
    res.status(200).send({
      success: true,
      message: "Sucessful Login",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token
    });


  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error
    })

  }

}

//testcontroller
const adminController = (req, res) => {
  try {
    return res.send("Admin is login");

  } catch (error) {
    console.log("Error in isAdmin Controller".bgRed.white);
    console.log(error);

  }

}


//forget password 
const forgetPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body
    if (!email) {
      res.status(400).send({ message: "Email is required" })
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" })
    }
    if (!newPassword) {
      res.status(400).send({ message: "newPassword is required" })
    }

    //checking email and answer
    const user = await userModal.findOne({ email, answer })
    console.log("Found and chnaging".bgGreen.white);
    //validate
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email in forget password",
      })
    }
    const hashed = await hashPassword(newPassword);
    await userModal.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password is reset Successfully"
    })


  } catch (error) {
    console.log(error);
    res.status(500).send({
      uccess: false,
      message: "Something wrong in forget password Backk",
      error

    })
  }
}

//Update the Profile
const updateProfileController = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const user = await userModal.findById(req.user._id);

    const updatedUser = await userModal.findByIdAndUpdate(
      req.user._id, {
      name: name || user.name,
      email: email || user.email,
      address: address || user.address,
      phone: phone || user.phone,
    }, { new: true });
    res.status(200).send({
      success: true,
      message: "Profile Updated Success",
      updatedUser
    })
    console.log("Upadted User Success".bgGreen.yellow);

  } catch (error) {
    console.log("Error in Update profile".bgRed.cyan, error);
    res.status(500).send({
      success: false,
      message: "Something wrong in updateProfileController Catch Block",
      error

    })

  }
}

//orders
const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModal
      .find({ buyers: req.user._id })
      .populate("products", "-photo")
      .populate("buyers", "name");
    res.json(orders)

  } catch (error) {
    console.log("Error in getOrdersController".bgRed.yellow, error);
    res.status(500).send({
      success: false,
      message: "Something wrong in getOrdersController Catch Block",
      error

    })

  }
}


//all orders
const allOrderController = async (req, res) => {
  try {
    const orders = await orderModal
      .find({})
      .populate("products", "-photo")
      .populate("buyers", "name")
      .sort({ createdAt: "-1" });
    res.json(orders)

  } catch (error) {
    console.log("Error in getOrdersController".bgRed.yellow, error);
    res.status(500).send({
      success: false,
      message: "Something wrong in getOrdersController Catch Block",
      error

    })

  }

}

//order status
const orderStatusController = async (req, res) => {
  try {
    const { oid } = req.params
    const { status } = req.body
    const orders = await orderModal
      .findByIdAndUpdate(oid, { status }, { new: true })
    res.json(orders);

  } catch (error) {
    console.log("Error in orderStatusController".bgRed.yellow, error);
    res.status(500).send({
      success: false,
      message: "Something wrong in orderStatusController Catch Block",
      error

    })

  }

}


module.exports = { registerController, loginController, adminController, forgetPasswordController, updateProfileController, getOrdersController, allOrderController, orderStatusController };