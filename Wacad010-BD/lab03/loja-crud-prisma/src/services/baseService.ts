
import { prisma } from "../lib/prisma";

export async function limparBanco() {
  await prisma.itemCompra.deleteMany();
  await prisma.numeroDeSerie.deleteMany();
  await prisma.compra.deleteMany();
  await prisma.produto.deleteMany();
  await prisma.subcategoria.deleteMany();
  await prisma.endereco.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.categoria.deleteMany();
}

export async function criarCategoriaESubcategoriaBase() {
  const categoria = await prisma.categoria.create({
    data: {
      nome: "Eletrônicos",
    },
  });

  const subcategoria = await prisma.subcategoria.create({
    data: {
      nome: "Smartphones",
      idCat: categoria.idCat,
    },
  });

  return {
    categoria,
    subcategoria,
  };
}

