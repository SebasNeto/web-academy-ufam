import { Request, Response } from "express";

const supportedLanguages = ["pt-BR", "en-US"];

function changeLanguage(req: Request, res: Response) {
  const lang = req.body?.lang ?? req.query.lang;

  if (typeof lang !== "string" || !supportedLanguages.includes(lang)) {
    return res.status(400).json({
      message: "Linguagem inválida. Use pt-BR ou en-US.",
    });
  }

  res.cookie("lang", lang, { path: "/" });

  return res.status(200).json({ lang });
}

export default { changeLanguage };
