const companyController = require('../controllers/companyController');
const authMiddlewers = require('../middlewares/authMiddlewers');
const dynamicMiddleware = require('../middlewares/dynamicMiddleware');
const express = require('express');
const router = express.Router();
router.use(authMiddlewers.protect);
router
  .route('/')
  .get(companyController.getAllcompany)
  .post(companyController.createcompany);
router
  .route('/:id/uplode')
  .patch(
    authMiddlewers.restrictTo('admin'),
    dynamicImgMiddlewers.uploadPhoto(
      `public/img/companys`,
      `prodects${Math.random() * 1000000}`,
      `image`
    ),
    dynamicMiddleware.filteredBody('image'),
    dynamicMiddleware.setPathImginBody('companys', 'image'),
    productController.updateProduct
  );
router
  .route('/:id')
  .get(companyController.getcompany)
  .patch(companyController.updatecompany)
  .delete(companyController.deletecompany);
module.exports = router;
