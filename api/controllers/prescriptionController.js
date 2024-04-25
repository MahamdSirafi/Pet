const Prescriptio = require('../models/prescriptionModel');
const factory = require('../utils/handlerFactory');
exports.getAllPrescriptio = factory.getAllpop1(
  Prescriptio,
  {
    path: 'doctor',
    select: 'name  -_id',
  },
  {
    path: 'cart.product',
    select: 'name',
  }
);
exports.createPrescriptio = factory.createOne(Prescriptio);
