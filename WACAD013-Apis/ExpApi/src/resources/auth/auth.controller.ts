import { Request, Response } from "express";

import { UserTypes } from "../userType/userType.constants";
import * as usuarioService from "../usuario/usuario.service";
import * as authService from "./auth.service";
import { LoginDto, SignupDto } from "./auth.types";

async function signup(req: Request, res: Response) {
  const data = req.body as SignupDto;

  try {
    if (await usuarioService.findUserByEmail(data.email)) {
      return res.status(409).json({ message: "Email já cadastrado" });
    }

    const user = await usuarioService.createUser({
      tipoUsuarioId: UserTypes.CLIENT,
      nome: data.nome,
      email: data.email,
      senha: data.senha,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

async function login(req: Request, res: Response) {
  const data = req.body as LoginDto;

  try {
    const user = await authService.checkCredentials(data);

    if (!user) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    req.session.userId = user.id;
    req.session.userTypeId = user.userTypeId;

    return res.status(200).json({
      message: "Login realizado com sucesso",
      usuario: {
        id: user.id,
        tipoUsuarioId: user.userTypeId,
        nome: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

async function logout(req: Request, res: Response) {
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Não foi possível encerrar a sessão" });
    }

    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "Logout realizado com sucesso" });
  });
}

export default { signup, login, logout };
