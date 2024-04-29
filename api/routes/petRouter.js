const petController = require('../controllers/petController');
const authMiddlewers = require('../middlewares/authMiddlewers');
const dynamicImgMiddlewers = require('./../middlewares/dynamicImgMiddlewers');
const dynamicMiddleware = require('./../middlewares/dynamicMiddleware');
const express = require('express');
const router = express.Router();
router
  .route('/')
  .get(petController.getAllPet)
  .post(authMiddlewers.protect,
    authMiddlewers.restrictTo('admin'),
    dynamicImgMiddlewers.uploadPhoto(
      `public/img/pets`,
      `prodects${Math.random() * 1000000}`,
      `image`
    ),
    dynamicMiddleware.setPathImginBody('pets', 'image'),
    petController.createPet
  );
router.use(authMiddlewers.protect);
router
  .route('/:id')
  .get(petController.getPet)
  .patch(petController.updatePet)
  .delete(petController.deletePet);
router
  .route('/:id/uplode')
  .patch(
    authMiddlewers.restrictTo('admin'),
    dynamicImgMiddlewers.uploadPhoto(
      `public/img/pets`,
      `pets-${Math.random() * 1000000}`,
      `image`
    ),
    dynamicMiddleware.filteredBody('image'),
    dynamicMiddleware.setPathImginBody('pets', 'image'),
    petController.updatePet
  );
module.exports = router;
