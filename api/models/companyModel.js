const mongoose = require('mongoose');
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'enter filde name'],
    },
    image: {
      type: String,
      required: [true, 'enter filde image'],
    },
    description: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'enter filde address'],
    },
  },
  {
    timestamps: true,
  }
);
const Company = mongoose.model('Company', companySchema);
module.exports = Company;
