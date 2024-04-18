const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
  {
    cart: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: function () {
            return this.type;
          },
        },
        quantity: { type: Number, default: 1 },
        price: {
          type: Number,
          required: [true, 'A product must have a price'],
        },
        type: {
          type: String,
          required: [true, 'enter filde category'],
          enum: ['Product', 'Pet'],
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A order must have a user'],
    },
    address: {
      type: String,
      required: [true, 'restaurant must have a Location.'],
    },
    total: {
      type: Number,
      required: [true, 'A order must have a total'],
    },
  },
  { timestamps: true }
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
