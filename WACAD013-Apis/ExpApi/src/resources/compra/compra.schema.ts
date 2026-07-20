import Joi from "joi";

export const adicionarItemSchema = Joi.object({
  produtoId: Joi.number().integer().positive().required(),
  quantidade: Joi.number().integer().positive().required(),
});
