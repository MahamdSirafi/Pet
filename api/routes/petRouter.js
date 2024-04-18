const petController = require('../controllers/petController');
const authMiddlewers = require('../middlewares/authMiddlewers');
const express = require('express');
const router = express.Router();
router.use(authMiddlewers.protect);
router.route('/').get(petController.getAllPet).post(petController.createPet);
router
  .route('/:id')
  .get(petController.deletePet)
  .patch(petController.updatePet)
  .delete(petController.deletePet);
router
  .route('/:id/uplode')
  .patch(
    authMiddlewers.restrictTo('admin'),
    dynamicImgMiddlewers.uploadPhoto(
      `public/img/pets`,
      `prodects${Math.random() * 1000000}`,
      `image`
    ),
    dynamicMiddleware.filteredBody('image'),
    dynamicMiddleware.setPathImginBody('pets', 'image'),
    productController.updatepet
  );
module.exports = router;
