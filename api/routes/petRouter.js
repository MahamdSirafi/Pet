const petController = require('../controllers/petController');
const authMiddlewers = require('../middlewares/authMiddlewers');
const { uploadPhoto } = require('./../middlewares/petImgMiddlewers');
const dynamicMiddleware = require('./../middlewares/dynamicMiddleware');
const express = require('express');
const router = express.Router();
router
  .route('/')
  .get(petController.getAllPet)
  .post(
    authMiddlewers.protect,
    authMiddlewers.restrictTo('admin'),
    uploadPhoto,
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
    uploadPhoto,
    dynamicMiddleware.filteredBody('image'),
    dynamicMiddleware.setPathImginBody('pets', 'image'),
    petController.updatePet
  );
module.exports = router;
