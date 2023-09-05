const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.ObjectId,
    ref: 'category',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  shipping: {
    type: Boolean,
  }

},
  { timeStamps: true }
);

const Product = mongoose.model('products', productSchema);

module.exports = Product;