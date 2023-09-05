const JWT = require('jsonwebtoken');
const colors = require('colors');
const userModal = require('../models/userModal');

//Protected Routes token Base
const requireSignin = async (req, res, next) => {
  try {
    const decode = await JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.user = decode;
    next();

  } catch (error) {
    console.log("Error in JWt middleware ".bgRed.white);

  }
}

//admin Routes protect
const isAdmin = async (req, res, next) => {
  try {
    const user = await userModal.findById(req.user._id);
    console.log(user.role.bgGreen.white);
    if (user.role !== "1") {
      console.log("unAuthorized Access".bgCyan.white);
      return res.status(401).send({
        success: false,
        message: "unAuthorized Access"
      })
    } else {
      console.log("Authorized Access".bgGreen.white);
      next();
    }


  } catch (error) {
    response.status(401).send({
      success: false,
      message: "Error in Admin middleware"
    })
    console.log("Error in Middleware Admin".bgRed.white);

  }
}

module.exports = { requireSignin, isAdmin };
