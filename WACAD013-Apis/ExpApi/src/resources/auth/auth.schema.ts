import Joi from "joi";

export const signupSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().max(100).required(),
  senha: Joi.string().min(6).max(72).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().max(100).required(),
  senha: Joi.string().min(6).max(72).required(),
});
