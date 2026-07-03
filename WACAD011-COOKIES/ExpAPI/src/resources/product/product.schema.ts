import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().min(0).required(),
  stockQuantity: Joi.number().integer().min(0).required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  price: Joi.number().min(0),
  stockQuantity: Joi.number().integer().min(0),
}).min(1);