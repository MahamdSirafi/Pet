const express = require('express');
const router = express.Router();
const authMiddlewers = require('../middlewares/authMiddlewers');
const { uploadPhoto } = require('../middlewares/productImgMiddlewers');
const dynamicMiddleware = require('../middlewares/dynamicMiddleware');
const productController = require('../controllers/productController');
router
  .route('/')
  .get(productController.getAllProduct)
  .post(
    authMiddlewers.protect,
    authMiddlewers.restrictTo('admin'),
    uploadPhoto,
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
    uploadPhoto,
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
