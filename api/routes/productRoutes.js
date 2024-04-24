const express = require('express');
const router = express.Router();
const authMiddlewers = require('../middlewares/authMiddlewers');
const dynamicImgMiddlewers = require('../middlewares/dynamicImgMiddlewers');
const dynamicMiddleware = require('../middlewares/dynamicMiddleware');
const productController = require('../controllers/productController');
router.use(authMiddlewers.protect);
router
  .route('/')
  .get(productController.getAllProduct)
  .post(
    authMiddlewers.restrictTo('admin'),
    dynamicImgMiddlewers.uploadPhoto(
      `public/img/products`,
      `products-${Math.random() * 1000000}`,
      `image`
    ),
    dynamicMiddleware.setPathImginBody('companies', 'image'),
    productController.createProduct
  );
router
  .route('/:id')
  .get(productController.getProduct)
  .patch(authMiddlewers.restrictTo('admin'), productController.updateProduct)
  .delete(authMiddlewers.restrictTo('admin'), productController.deleteProduct);
router
  .route('/:id/uplode')
  .patch(
    authMiddlewers.restrictTo('admin'),
    dynamicImgMiddlewers.uploadPhoto(
      `public/img/prodects`,
      `prodects-${Math.random() * 1000000}`,
      `image`
    ),
    dynamicMiddleware.filteredBody('image'),
    dynamicMiddleware.setPathImginBody('prodects', 'image'),
    productController.updateProduct
  );
router
  .route('/:id/review')
  .patch(authMiddlewers.restrictTo('user'), productController.review);
module.exports = router;
