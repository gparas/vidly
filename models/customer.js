const Joi = require('joi');
const mongoose = require('mongoose');

// Schemas
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  phone: { type: String, minlength: 5, maxlength: 50 },
  isGold: { type: Boolean, default: false },
});

const Customer = mongoose.model('Customer', customerSchema);

const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
};

module.exports = {
  Customer,
  validateCustomer,
};
