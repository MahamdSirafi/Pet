const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const { checkOwner } = require('../middlewares/checkMiddleware');
const authMiddlewers = require('../middlewares/authMiddlewers');
const dynamicMiddleware = require('../middlewares/dynamicMiddleware');
const orderController = require('../controllers/orderController');
router.use(authMiddlewers.protect);
router
  .route('/agguser/:year/:month')
  .get(
    authMiddlewers.restrictTo('admin'),
    orderController.statisticsWithLinkUser
  );
router
  .route('/Prescription')
  .post(
    authMiddlewers.restrictTo('user'),
    dynamicMiddleware.addVarBody('user', 'userId'),
    orderController.createOrderforPrescription
  );
router
  .route('/mien')
  .get(
    authMiddlewers.restrictTo('user'),
    dynamicMiddleware.addQuery('user', 'userId'),
    orderController.getAllOrder
  );
router
  .route('/')
  .get(authMiddlewers.restrictTo('admin'), orderController.getAllOrder)
  .post(
    authMiddlewers.restrictTo('user'),
    dynamicMiddleware.addVarBody('user', 'userId'),
    orderController.createOrder
  );
router
  .route('/:id')
  .get(authMiddlewers.restrictTo('user', 'admin'), orderController.getOrder)
  .patch(
    authMiddlewers.restrictTo('user'),
    checkOwner(Order, 'user', 'id'),
    orderController.updateOrder
  )
  .delete(authMiddlewers.restrictTo('admin'), orderController.deleteOrder);

module.exports = router;
