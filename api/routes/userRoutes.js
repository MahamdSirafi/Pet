const express = require('express');
const dynamicImgMiddlewers = require('./../middlewares/dynamicImgMiddlewers');
const { uploadUserPhoto } = require('./../middlewares/imguserMiddlewers');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const authMiddlewers = require('./../middlewares/authMiddlewers');
const router = express.Router();
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.get('/resetPassword/:token', (req, res) => {
  res.render('user/resetPassword2');
});
router.post('/signup', authController.signup);
// router.use(authMiddlewers.protect);
router.patch('/activeMe', authMiddlewers.protect, userController.activeMe);
// router.use(authMiddlewers.isactive)
router.patch(
  '/updateMyPassword',
  authMiddlewers.protect,
  authController.updatePassword
);
router.get(
  '/me',
  authMiddlewers.protect,
  userController.getMe,
  userController.getUser
);
router.patch(
  '/updateMeAndUpload',
  authMiddlewers.protect,
  uploadUserPhoto,
  userController.updateMe
);
router.patch('/updateMe', authMiddlewers.protect, userController.updateMe);
router.delete('/deleteMe', authMiddlewers.protect, userController.deleteMe);
// router.use(authMiddlewers.restrictTo('admin'));
router
  .route('/')
  .get(
    userController.getAllUsers
  )
  .post(
    authMiddlewers.protect,
    authMiddlewers.isactive,
    authMiddlewers.restrictTo('admin'),
    userController.createUser
  );
router
  .route('/:id')
  .get(
    authMiddlewers.protect,
    authMiddlewers.isactive,
    authMiddlewers.restrictTo('admin'),
    userController.getUser
  )
  .patch(
    authMiddlewers.protect,
    authMiddlewers.isactive,
    authMiddlewers.restrictTo('admin'),
    userController.updateUser
  )
  .delete(
    authMiddlewers.protect,
    authMiddlewers.isactive,
    authMiddlewers.restrictTo('admin'),
    userController.deleteUser
  );
module.exports = router;
