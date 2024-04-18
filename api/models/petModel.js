const mongoose = require('mongoose');
const animalSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      trim: true,
      required: [true, 'enter filde category'],
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
    size: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;
