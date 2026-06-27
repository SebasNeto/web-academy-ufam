
import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";

type CriarProdutoDTO = {
  fabricante: string;
  produto: string;
  quantidadeDisponivel: number;
  precoBase: string;
  idSub: number;
  numerosDeSerie?: string[];
};

type AtualizarProdutoDTO = {
  fabricante?: string;
  produto?: string;
  quantidadeDisponivel?: number;
  precoBase?: string;
  idSub?: number;
};

export async function criarProduto(dados: CriarProdutoDTO) {
  return prisma.produto.create({
    data: {
      fabricante: dados.fabricante,
      produto: dados.produto,
      quantidadeDisponivel: dados.quantidadeDisponivel,
      precoBase: new Prisma.Decimal(dados.precoBase),
      idSub: dados.idSub,
      numerosDeSerie: {
        create: dados.numerosDeSerie?.map((serie) => ({
          numeroSerie: serie,
        })) ?? [],
      },
    },
    include: {
      subcategoria: {
        include: {
          categoria: true,
        },
      },
      numerosDeSerie: true,
    },
  });
}

export async function listarProdutos() {
  return prisma.produto.findMany({
    include: {
      subcategoria: {
        include: {
          categoria: true,
        },
      },
      numerosDeSerie: true,
    },
    orderBy: {
      idProduto: "asc",
    },
  });
}

export async function buscarProdutoPorId(idProduto: number) {
  return prisma.produto.findUnique({
    where: {
      idProduto,
    },
    include: {
      subcategoria: {
        include: {
          categoria: true,
        },
      },
      numerosDeSerie: true,
      itensCompra: true,
    },
  });
}

export async function atualizarProduto(idProduto: number, dados: AtualizarProdutoDTO) {
  return prisma.produto.update({
    where: {
      idProduto,
    },
    data: {
      fabricante: dados.fabricante,
      produto: dados.produto,
      quantidadeDisponivel: dados.quantidadeDisponivel,
      precoBase: dados.precoBase ? new Prisma.Decimal(dados.precoBase) : undefined,
      idSub: dados.idSub,
    },
    include: {
      subcategoria: {
        include: {
          categoria: true,
        },
      },
      numerosDeSerie: true,
    },
  });
}

export async function adicionarNumeroSerie(idProduto: number, numeroSerie: string) {
  return prisma.numeroDeSerie.create({
    data: {
      idProduto,
      numeroSerie,
    },
  });
}

export async function removerNumeroSerie(idProduto: number, numeroSerie: string) {
  return prisma.numeroDeSerie.delete({
    where: {
      idProduto_numeroSerie: {
        idProduto,
        numeroSerie,
      },
    },
  });
}

export async function deletarProduto(idProduto: number) {
  const produto = await prisma.produto.findUnique({
    where: {
      idProduto,
    },
    include: {
      itensCompra: true,
    },
  });

  if (!produto) {
    throw new Error("Produto não encontrado.");
  }

  if (produto.itensCompra.length > 0) {
    throw new Error("Não é possível deletar produto vinculado a uma compra.");
  }

  await prisma.numeroDeSerie.deleteMany({
    where: {
      idProduto,
    },
  });

  return prisma.produto.delete({
    where: {
      idProduto,
    },
  });
}
