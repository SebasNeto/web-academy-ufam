import { Router } from "express";

import productController from "./product.controller";
import validate from "../../middlewares/validate";
import isAdmin from "../../middlewares/isAdmin";
import {
  createProductSchema,
  updateProductSchema,
} from "./product.schema";

const router = Router();

/**
 * @openapi
 * /produto:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produto]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", productController.index);

/**
 * @openapi
 * /produto:
 *   post:
 *     summary: Adiciona um produto (somente administrador)
 *     tags: [Produto]
 *     security: [{ cookieAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProduct'
 *     responses:
 *       201:
 *         description: Produto criado
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Usuário não é administrador
 */
router.post(
  "/",
  isAdmin,
  validate(createProductSchema),
  productController.create
);

/**
 * @openapi
 * /produto/{id}:
 *   get:
 *     summary: Busca um produto pelo id
 *     tags: [Produto]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 */
router.get("/:id", productController.read);

/**
 * @openapi
 * /produto/{id}:
 *   put:
 *     summary: Atualiza um produto (somente administrador)
 *     tags: [Produto]
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProduct'
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       403:
 *         description: Usuário não é administrador
 *       404:
 *         description: Produto não encontrado
 */
router.put(
  "/:id",
  isAdmin,
  validate(updateProductSchema),
  productController.update
);

/**
 * @openapi
 * /produto/{id}:
 *   delete:
 *     summary: Remove um produto (somente administrador)
 *     tags: [Produto]
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Produto removido
 *       403:
 *         description: Usuário não é administrador
 *       404:
 *         description: Produto não encontrado
 */
router.delete("/:id", isAdmin, productController.remove);

export default router;
