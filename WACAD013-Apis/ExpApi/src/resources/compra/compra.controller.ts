import { Request, Response } from "express";

import * as compraService from "./compra.service";
import { AdicionarItemDto, ItemCarrinho } from "./compra.types";

function getCarrinho(req: Request): ItemCarrinho[] {
  req.session.carrinho ??= [];
  return req.session.carrinho;
}

function handleError(error: unknown, res: Response) {
  if (error instanceof compraService.CompraError) {
    return res.status(error.status).json({ message: error.message });
  }

  console.error(error);
  return res.status(500).json({ message: "Erro interno do servidor" });
}

async function carrinho(req: Request, res: Response) {
  try {
    return res
      .status(200)
      .json(await compraService.detalhesCarrinho(getCarrinho(req)));
  } catch (error) {
    return handleError(error, res);
  }
}

async function adicionar(req: Request, res: Response) {
  const data = req.body as AdicionarItemDto;
  const itens = getCarrinho(req);
  const currentItem = itens.find((item) => item.produtoId === data.produtoId);
  const totalQuantity = (currentItem?.quantidade ?? 0) + data.quantidade;

  try {
    await compraService.validarProduto(data.produtoId, totalQuantity);

    if (currentItem) {
      currentItem.quantidade = totalQuantity;
    } else {
      itens.push(data);
    }

    return res
      .status(201)
      .json(await compraService.detalhesCarrinho(itens));
  } catch (error) {
    return handleError(error, res);
  }
}

async function remover(req: Request, res: Response) {
  const produtoId = Number(req.params.produtoId);
  const itens = getCarrinho(req);
  const index = itens.findIndex((item) => item.produtoId === produtoId);

  if (index < 0) {
    return res.status(404).json({ message: "Produto não está no carrinho" });
  }

  itens.splice(index, 1);
  return res.status(200).json(await compraService.detalhesCarrinho(itens));
}

async function concluir(req: Request, res: Response) {
  try {
    const purchase = await compraService.concluirCompra(
      req.session.userId!,
      getCarrinho(req)
    );

    req.session.carrinho = [];
    return res.status(201).json(purchase);
  } catch (error) {
    return handleError(error, res);
  }
}

async function index(req: Request, res: Response) {
  try {
    const purchases = await compraService.listarCompras(req.session.userId!);
    return res.status(200).json(purchases);
  } catch (error) {
    return handleError(error, res);
  }
}

export default { index, carrinho, adicionar, remover, concluir };
