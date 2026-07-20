import { hash } from "bcryptjs";
import { Prisma } from "@prisma/client";

import { prisma } from "../../lib/prisma";
import { CreateUserDto, UpdateUserDto, UserDto } from "./usuario.types";

const BCRYPT_ROUNDS = 10;

const userSelect = {
  id: true,
  name: true,
  email: true,
  userTypeId: true,
  createdAt: true,
  updatedAt: true,
  userType: {
    select: {
      id: true,
      label: true,
    },
  },
} satisfies Prisma.UserSelect;

type SelectedUser = Prisma.UserGetPayload<{ select: typeof userSelect }>;

function toUserDto(user: SelectedUser): UserDto {
  return {
    id: user.id,
    tipoUsuarioId: user.userTypeId,
    nome: user.name,
    email: user.email,
    tipoUsuario: user.userType,
    criadoEm: user.createdAt,
    atualizadoEm: user.updatedAt,
  };
}

export async function getAllUsers(): Promise<UserDto[]> {
  const users = await prisma.user.findMany({
    select: userSelect,
    orderBy: { createdAt: "desc" },
  });

  return users.map(toUserDto);
}

export async function createUser(data: CreateUserDto): Promise<UserDto> {
  const password = await hash(data.senha, BCRYPT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      userTypeId: data.tipoUsuarioId,
      name: data.nome,
      email: data.email,
      password,
    },
    select: userSelect,
  });

  return toUserDto(user);
}

export async function updateUser(
  id: string,
  data: UpdateUserDto
): Promise<UserDto> {
  const updateData: Prisma.UserUncheckedUpdateInput = {};

  if (data.tipoUsuarioId !== undefined) {
    updateData.userTypeId = data.tipoUsuarioId;
  }
  if (data.nome !== undefined) updateData.name = data.nome;
  if (data.email !== undefined) updateData.email = data.email;
  if (data.senha !== undefined) {
    updateData.password = await hash(data.senha, BCRYPT_ROUNDS);
  }

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
    select: userSelect,
  });

  return toUserDto(user);
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserById(id: string): Promise<UserDto | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    select: userSelect,
  });

  return user ? toUserDto(user) : null;
}

export async function deleteUsuario(id: string): Promise<void> {
  await prisma.user.delete({ where: { id } });
}
