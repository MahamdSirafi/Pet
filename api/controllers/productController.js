const Product = require('../models/productModel');
const factory = require('../utils/handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
exports.getAllProduct = factory.getAllpop(Product, 'company');
exports.getProduct = factory.getOne(Product, {
  patch: 'company',
  select: '-_id -__v',
});
exports.updateProduct = factory.updateOne(Product);
exports.createProduct = factory.createOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
exports.review = catchAsync(async (req, res, next) => {
  const doc = await Product.findById(req.params.id);
  doc.ratingsQuantity++;
  doc.ratingsAverage =
    (doc.ratingsAverage * (doc.ratingsQuantity - 1) + req.body.rating) /
    doc.ratingsQuantity;
  await doc.save();
  res.status(200).json({ status: 'succes', doc });
});
