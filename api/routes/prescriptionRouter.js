const prescriptionController = require('../controllers/prescriptionController');
const authMiddlewers = require('../middlewares/authMiddlewers');
const dynamicMiddleware = require('../middlewares/dynamicMiddleware');
const express = require('express');
const router = express.Router();
router.use(authMiddlewers.protect);
router
  .route('/')
  .get(prescriptionController.getAllPrescriptio)
  .post(
    authMiddlewers.restrictTo('doctor'),
    dynamicMiddleware.addVarBody('doctor', 'userId'),
    prescriptionController.createPrescriptio
  );

router
  .route('/mine')
  .get(
    authMiddlewers.restrictTo('user'),
    dynamicMiddleware.addQuery('user', 'userId'),
    prescriptionController.getAllPrescriptio
  );
module.exports = router;
