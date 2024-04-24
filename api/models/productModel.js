const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Companie',
      required: [true, 'enter filde Restaurant'],
    },
    category: {
      type: String,
      trim: true,
      required: [true, 'enter filde category'],
    },
    type: {
      type: String,
      required: [true, 'enter filde category'],
      enum: ['product', 'food', 'midcan'],
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
    description: {
      type: String,
      trim: true,
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
