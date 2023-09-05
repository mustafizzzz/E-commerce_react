const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

  products: [
    {
      type: mongoose.ObjectId,
      ref: 'products',
    },
  ],
  payment: {},
  buyers: {
    type: mongoose.ObjectId,
    ref: 'users'
  },
  status: {
    type: String,
    default: 'Nor Process',
    enum: ["Nor Process", "Processing", "Shipped", "Deliverd", "Cancled"],
  },
}, { timestamps: true })

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
