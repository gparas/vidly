const Joi = require('joi');

const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
};

const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.string(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
};

module.exports = {
  validateGenre,
  validateCustomer,
};
