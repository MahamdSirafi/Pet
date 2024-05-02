const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
  {
    company:{
      type: String,
      trim: true,
      required: [true, 'enter filde company'],
    },
    category: {
      type: String,
      trim: true,
      required: [true, 'enter filde category'],
    },
    type: {
      type: String,
      required: [true, 'enter filde type'],
      enum: ['product', 'food', 'medican'],
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'enter filde name'],
    },
    image: {
      type: String,
      required: [true, 'enter filde image'],
    },
    price: {
      type: Number,
      required: [true, 'enter filde price'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
