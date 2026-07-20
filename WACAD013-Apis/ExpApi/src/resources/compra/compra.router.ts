import { Router } from "express";

import isAuth from "../../middlewares/isAuth";
import validate from "../../middlewares/validate";
import compraController from "./compra.controller";
import { adicionarItemSchema } from "./compra.schema";

const router = Router();

router.use(isAuth);

/**
 * @openapi
 * /compra:
 *   get:
 *     summary: Lista as compras do usuário autenticado
 *     tags: [Compra]
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       200:
 *         description: Histórico de compras
 *       401:
 *         description: Usuário não autenticado
 *   post:
 *     summary: Conclui a compra e salva os itens do carrinho
 *     tags: [Compra]
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       201:
 *         description: Compra concluída
 *       400:
 *         description: Carrinho vazio
 *       409:
 *         description: Estoque insuficiente
 */
router.get("/", compraController.index);
router.post("/", compraController.concluir);

/**
 * @openapi
 * /compra/carrinho:
 *   get:
 *     summary: Exibe o carrinho da sessão
 *     tags: [Compra]
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       200:
 *         description: Carrinho com itens e valor total
 *   post:
 *     summary: Adiciona uma quantidade de produto ao carrinho
 *     tags: [Compra]
 *     security: [{ cookieAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemCarrinho'
 *     responses:
 *       201:
 *         description: Item adicionado
 *       404:
 *         description: Produto não encontrado
 *       409:
 *         description: Estoque insuficiente
 */
router.get("/carrinho", compraController.carrinho);
router.post(
  "/carrinho",
  validate(adicionarItemSchema),
  compraController.adicionar
);
router.put(
  "/carrinho",
  validate(adicionarItemSchema),
  compraController.adicionar
);

/**
 * @openapi
 * /compra/carrinho/{produtoId}:
 *   delete:
 *     summary: Remove um produto do carrinho
 *     tags: [Compra]
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - name: produtoId
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Item removido
 *       404:
 *         description: Produto não está no carrinho
 */
router.delete("/carrinho/:produtoId", compraController.remover);

router.post("/finalizar", compraController.concluir);

export default router;
