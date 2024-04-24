const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const factory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllOrder = factory.getAllpop1(
  Order,
  {
    path: 'user',
    select: 'name  -_id',
  },
  {
    path: 'cart.product',
    select: 'name price -_id',
  }
);
exports.getOrder = factory.getOne(
  Order,
  {
    path: 'user',
    select: 'name -_id',
  },
  {
    path: 'cart.product',
    select: 'name price -_id',
  }
);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
exports.createOrder = factory.createOne(Order);
exports.createOrderforPrescription = catchAsync(async (req, res, next) => {
  for (let i = 0; i < req.body.cart.length; i++) {
    req.body.total = 0;
    thisProduct = await Product.findById(req.body.cart[i].product);
    if (!thisProduct) return next(new AppError('Product is not defind', 404));
    req.body.cart[i] = {
      product: req.body.cart[i].product,
      quantity: req.body.cart[i].quantity,
      type: 'Product',
      price: thisProduct.price * req.body.cart[i].quantity,
    };
    req.body.total += thisProduct.price * req.body.cart[i].quantity;
  }
  const doc = await Order.create(req.body);
  res.status(200).json({
    status: 'success',
    doc,
  });
});
// exports.chekOrder = catchAsync(async (req, res, next) => {
//   const doc = await Order.findById(req.params.id);
//   if (doc.status != ('Accepted' || 'Placed'))
//     return next(new AppError('the order Preparing', 400));
//   next();
// });

exports.statisticsWithLinkUser = factory.statisticsWithLink(
  Order,
  'total',
  'users',
  'user',
  'user.name',
  'user.email'
);
