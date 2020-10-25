const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const U = require('./utils');

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('the requested id does not exist');

  res.send(customer);
});

router.post('/', async (req, res) => {
  const { error } = U.validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();

  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { error } = U.validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  if (!customer) return res.status(404).send('the requested id does not exist');

  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findOneAndRemove(req.params.id);

  if (!customer) return res.status(404).send('the requested id does not exist');

  res.send(customer);
});

module.exports = router;
