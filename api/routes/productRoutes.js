const express = require('express');
const router = express.Router();
const authMiddlewers = require('../middlewares/authMiddlewers');
const dynamicImgMiddlewers = require('../middlewares/dynamicImgMiddlewers');
const dynamicMiddleware = require('../middlewares/dynamicMiddleware');
const productController = require('../controllers/productController');
router
  .route('/')
  .get(productController.getAllProduct)
  .post(
    authMiddlewers.protect,
    authMiddlewers.restrictTo('admin'),
    dynamicImgMiddlewers.uploadPhoto(
      `public/img/products`,
      `products-${Math.random() * 1000000}`,
      `image`
    ),
    dynamicMiddleware.setPathImginBody('products', 'image'),
    productController.createProduct
  );
router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    authMiddlewers.protect,
    authMiddlewers.restrictTo('admin'),
    productController.updateProduct
  )
  .delete(
    authMiddlewers.protect,
    authMiddlewers.restrictTo('admin'),
    productController.deleteProduct
  );
router
  .route('/:id/uplode')
  .patch(
    authMiddlewers.protect,
    authMiddlewers.restrictTo('admin'),
    dynamicImgMiddlewers.uploadPhoto(
      `public/img/products`,
      `prodects-${Math.random() * 1000000}`,
      `image`
    ),
    dynamicMiddleware.filteredBody('image'),
    dynamicMiddleware.setPathImginBody('prodects', 'image'),
    productController.updateProduct
  );
router
  .route('/:id/review')
  .patch(
    authMiddlewers.protect,
    authMiddlewers.restrictTo('user'),
    productController.review
  );
module.exports = router;
