import Joi from "joi";

import { UserTypes } from "../userType/userType.constants";

const fields = {
  tipoUsuarioId: Joi.string()
    .valid(UserTypes.ADMIN, UserTypes.CLIENT)
    .messages({
      "any.only": "tipoUsuarioId deve corresponder a admin ou client",
    }),
  nome: Joi.string().min(3).max(100),
  email: Joi.string().email().max(100),
  senha: Joi.string().min(6).max(72),
};

export const createUsuarioSchema = Joi.object({
  tipoUsuarioId: fields.tipoUsuarioId.required(),
  nome: fields.nome.required(),
  email: fields.email.required(),
  senha: fields.senha.required(),
});

export const updateUsuarioSchema = Joi.object(fields).min(1);
