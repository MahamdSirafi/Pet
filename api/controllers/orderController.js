const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const factory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const axios = require('axios');
exports.getAllOrder = factory.getAllpop1(
  Order,
  {
    path: 'user',
    select: 'name phone -_id',
  },
  {
    path: 'cart.product',
    select: 'name price -_id',
  },
  {
    path: 'delivery',
    select: 'firstName lastName phone -_id',
  },
  {
    path: 'location',
  }
);
exports.getOrder = factory.getOne(
  Order,
  {
    path: 'user',
    select: 'name phone -_id',
  },
  {
    path: 'cart.product',
    select: 'name price -_id',
  },
  {
    path: 'delivery',
    select: 'firstName lastName phone -_id',
  },
  {
    path: 'location',
  },
  {
    path: 'restaurant',
    select: 'name -_id',
  }
);
exports.updateOrder = factory.updateOne(Order);
exports.deleteOrder = factory.deleteOne(Order);
exports.createOrder = factory.createOne(Order);
exports.chekOrder = catchAsync(async (req, res, next) => {
  const doc = await Order.findById(req.params.id);
  if (doc.status != ('Accepted' || 'Placed'))
    return next(new AppError('the order Preparing', 400));
  next();
});

exports.statisticsWithLinkUser = factory.statisticsWithLink(
  Order,
  'priceDelivery',
  'users',
  'user',
  'user.name',
  'user.phone',
  'user.email'
);