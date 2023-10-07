const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  product: {
    type: String,
    required: [true, "Enter product name"],
  },
  price: {
    type: Number,
    required: [true, "Enter product price"],
  },
  buyerEmail: {
    type: String,
    required: [true, "Enter Email"],
  },
  paymentMethod: {
    type: String,
    required: [true, "Enter payment method"],
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
