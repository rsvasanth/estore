var Joi = require('joi');

module.exports = {
  body : {
    "name": Joi.string().min(3).required(),
    "title": Joi.string().min(3).required(),
    "category": Joi.string().alphanum().required(),
    "description": Joi.required(),
    "sku": Joi.string().alphanum().min(4).max(10),
    "price": Joi.number().required(),
    "selling_price": Joi.number(),
    "commission": Joi.number().precision(2).required(),
    "service_tax": Joi.number().precision(2),
    "weight": Joi.required(),
    "ship_duration": Joi.string().required(),
    "paid_by": Joi.number().integer().required()
  }
};
