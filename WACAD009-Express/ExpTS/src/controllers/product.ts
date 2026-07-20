import { Request, Response } from 'express';
import productService, { ProductInput } from '../services/product';

const parseProduct = (body: Request['body']): ProductInput => {
  const nome = String(body.nome ?? '').trim();
  const preco = Number(body.preco);
  const estoque = Number(body.estoque);

  if (
    !nome ||
    !Number.isFinite(preco) ||
    preco < 0 ||
    !Number.isInteger(estoque) ||
    estoque < 0
  ) {
    throw new Error('Preencha nome, preço e estoque com valores válidos.');
  }

  return { nome, preco, estoque };
};

const renderFailure = (res: Response, error: unknown) => {
  const message =
    error instanceof Error
      ? error.message
      : 'Não foi possível concluir a operação.';
  res.status(502).render('product/error', {
    title: 'Erro no CRUD de produtos',
    message,
  });
};

const index = async (req: Request, res: Response) => {
  try {
    const produtos = await productService.index();
    res.render('product/index', { title: 'Produtos', produtos });
  } catch (error) {
    renderFailure(res, error);
  }
};

const create = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    res.render('product/create', { title: 'Novo produto' });
    return;
  }

  try {
    await productService.create(parseProduct(req.body));
    res.redirect('/produto');
  } catch (error) {
    renderFailure(res, error);
  }
};

const read = async (req: Request, res: Response) => {
  try {
    const produto = await productService.read(String(req.params.id));
    res.render('product/read', { title: 'Detalhes do produto', produto });
  } catch (error) {
    renderFailure(res, error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    if (req.method === 'GET') {
      const produto = await productService.read(String(req.params.id));
      res.render('product/update', { title: 'Editar produto', produto });
      return;
    }

    await productService.update(String(req.params.id), parseProduct(req.body));
    res.redirect('/produto');
  } catch (error) {
    renderFailure(res, error);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    await productService.remove(String(req.params.id));
    res.redirect('/produto');
  } catch (error) {
    renderFailure(res, error);
  }
};

export default { index, create, read, update, remove };
