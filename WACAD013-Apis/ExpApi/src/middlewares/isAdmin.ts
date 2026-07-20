import { NextFunction, Request, Response } from "express";

import { UserTypes } from "../resources/userType/userType.constants";

export default function isAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Autenticação necessária" });
  }

  if (req.session.userTypeId !== UserTypes.ADMIN) {
    return res
      .status(403)
      .json({ message: "Acesso permitido apenas para administradores" });
  }

  return next();
}
