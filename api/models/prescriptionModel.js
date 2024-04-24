const mongoose = require('mongoose');
const prescriptionSchema = new mongoose.Schema(
  {
    cart: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
          required: [true, 'A product must have a ID'],
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A prescription must have a user'],
    },
    doctor: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A prescription must have a doctor'],
    },
  },
  { timestamps: true }
);
const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;
