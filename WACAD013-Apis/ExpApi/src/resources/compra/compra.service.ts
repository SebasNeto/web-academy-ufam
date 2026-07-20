import { prisma } from "../../lib/prisma";
import { ItemCarrinho } from "./compra.types";

export class CompraError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
  }
}

export async function detalhesCarrinho(carrinho: ItemCarrinho[]) {
  if (carrinho.length === 0) {
    return { itens: [], total: 0 };
  }

  const products = await prisma.product.findMany({
    where: { id: { in: carrinho.map((item) => item.produtoId) } },
  });

  const productsById = new Map(products.map((product) => [product.id, product]));
  const itens = carrinho.flatMap((item) => {
    const produto = productsById.get(item.produtoId);
    if (!produto) return [];

    return [
      {
        produto,
        quantidade: item.quantidade,
        subtotal: produto.price * item.quantidade,
      },
    ];
  });

  return {
    itens,
    total: itens.reduce((total, item) => total + item.subtotal, 0),
  };
}

export async function validarProduto(
  produtoId: number,
  quantidade: number
) {
  const product = await prisma.product.findUnique({ where: { id: produtoId } });

  if (!product) {
    throw new CompraError("Produto não encontrado", 404);
  }

  if (quantidade > product.stockQuantity) {
    throw new CompraError("Quantidade maior que o estoque disponível", 409);
  }

  return product;
}

export async function concluirCompra(
  userId: string,
  carrinho: ItemCarrinho[]
) {
  if (carrinho.length === 0) {
    throw new CompraError("O carrinho está vazio", 400);
  }

  return prisma.$transaction(async (transaction) => {
    const productIds = carrinho.map((item) => item.produtoId);
    const products = await transaction.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      throw new CompraError("Um ou mais produtos não foram encontrados", 404);
    }

    for (const item of carrinho) {
      const updated = await transaction.product.updateMany({
        where: {
          id: item.produtoId,
          stockQuantity: { gte: item.quantidade },
        },
        data: {
          stockQuantity: { decrement: item.quantidade },
        },
      });

      if (updated.count === 0) {
        throw new CompraError(
          `Estoque insuficiente para o produto ${item.produtoId}`,
          409
        );
      }
    }

    return transaction.purchase.create({
      data: {
        userId,
        items: {
          create: carrinho.map((item) => ({
            productId: item.produtoId,
            quantity: item.quantidade,
          })),
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
  });
}

export async function listarCompras(userId: string) {
  return prisma.purchase.findMany({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
