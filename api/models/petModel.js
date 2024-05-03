const mongoose = require('mongoose');
const animalSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      trim: true,
      enum: ['dogs', 'cats', 'birds','fish'],
      
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
const Pet = mongoose.model('Pet', animalSchema);
module.exports = Pet;
