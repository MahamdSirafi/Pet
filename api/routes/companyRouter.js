const companyController = require('../controllers/companyController');
const authMiddlewers = require('../middlewares/authMiddlewers');
const dynamicMiddleware = require('../middlewares/dynamicMiddleware');
const dynamicImgMiddlewers = require('../middlewares/dynamicImgMiddlewers');
const express = require('express');
const router = express.Router();
router.use(authMiddlewers.protect);
router
  .route('/')
  .get(companyController.getAllcompany)
  .post(
    authMiddlewers.restrictTo('admin'),
    dynamicImgMiddlewers.uploadPhoto(
      `public/img/companies`,
      `companies-${Math.random() * 1000000}`,
      `image`
    ),
    dynamicMiddleware.setPathImginBody('companies', 'image'),
    companyController.createcompany
  );
router
  .route('/:id/uplode')
  .patch(
    authMiddlewers.restrictTo('admin'),
    dynamicImgMiddlewers.uploadPhoto(
      `public/img/companies`,
      `prodects${Math.random() * 1000000}`,
      `image`
    ),
    dynamicMiddleware.filteredBody('image'),
    dynamicMiddleware.setPathImginBody('companies', 'image'),
    companyController.updatecompany
  );
router
  .route('/:id')
  .get(companyController.getcompany)
  .patch(companyController.updatecompany)
  .delete(companyController.deletecompany);
module.exports = router;
