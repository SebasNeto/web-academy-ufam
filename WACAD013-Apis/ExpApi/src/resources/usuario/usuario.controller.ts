import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import * as usuarioService from "./usuario.service";
import { CreateUserDto, UpdateUserDto } from "./usuario.types";

function getParamId(req: Request): string {
  const id = req.params.id;
  return Array.isArray(id) ? (id[0] ?? "") : id;
}

function handlePrismaError(error: unknown, res: Response) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Email já cadastrado" });
    }

    if (error.code === "P2003") {
      return res.status(400).json({ message: "Tipo de usuário inválido" });
    }

    if (error.code === "P2025") {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
  }

  console.error(error);
  return res.status(500).json({ message: "Erro interno do servidor" });
}

async function index(_req: Request, res: Response) {
  try {
    const users = await usuarioService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

async function create(req: Request, res: Response) {
  const data = req.body as CreateUserDto;

  try {
    if (await usuarioService.findUserByEmail(data.email)) {
      return res.status(409).json({ message: "Email já cadastrado" });
    }

    const user = await usuarioService.createUser(data);
    return res.status(201).json(user);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

async function read(req: Request, res: Response) {
  const id = getParamId(req);

  try {
    const user = await usuarioService.findUserById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

async function update(req: Request, res: Response) {
  const data = req.body as UpdateUserDto;
  const id = getParamId(req);

  try {
    const currentUser = await usuarioService.findUserById(id);

    if (!currentUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (data.email) {
      const userWithSameEmail = await usuarioService.findUserByEmail(data.email);
      if (userWithSameEmail && userWithSameEmail.id !== id) {
        return res.status(409).json({ message: "Email já cadastrado" });
      }
    }

    const user = await usuarioService.updateUser(id, data);
    return res.status(200).json(user);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

async function remove(req: Request, res: Response) {
  const id = getParamId(req);

  try {
    await usuarioService.deleteUsuario(id);
    return res.sendStatus(204);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export default { index, create, read, update, remove };
