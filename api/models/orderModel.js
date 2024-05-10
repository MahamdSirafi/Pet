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
          required: [true, 'A cart must have a price'],
        },
        type: {
          type: String,
          required: [true, 'enter type FK Product or Pet'],
          enum: ['Product', 'Pet', 'product', 'pet'],
          set: (value) => {
            if (value == 'product') return 'Product';
            if (value == 'pet') return 'Pet';
            else return value;
          },
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
      required: [true, 'يجب ادخال موقع التوصيل.'],
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
