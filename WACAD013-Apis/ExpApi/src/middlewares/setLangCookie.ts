import { NextFunction, Request, Response } from "express";

function setLangCookie(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies.lang) {
    res.cookie("lang", "pt-BR", { path: "/" });
  }

  next();
}

export default setLangCookie;
