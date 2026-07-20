import { Router } from "express";

import validate from "../../middlewares/validate";
import usuarioController from "./usuario.controller";
import {
  createUsuarioSchema,
  updateUsuarioSchema,
} from "./usuario.schema";

const router = Router();

/**
 * @openapi
 * /usuario:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuário]
 *     responses:
 *       200:
 *         description: Lista de usuários sem as senhas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *   post:
 *     summary: Cria um usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUsuario'
 *     responses:
 *       201:
 *         description: Usuário criado com senha criptografada
 *       409:
 *         description: Email já cadastrado
 */
router.get("/", usuarioController.index);
router.post("/", validate(createUsuarioSchema), usuarioController.create);

/**
 * @openapi
 * /usuario/{id}:
 *   get:
 *     summary: Busca um usuário pelo id
 *     tags: [Usuário]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Usuário]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUsuario'
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       404:
 *         description: Usuário não encontrado
 *   delete:
 *     summary: Remove um usuário
 *     tags: [Usuário]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       204:
 *         description: Usuário removido
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/:id", usuarioController.read);
router.put("/:id", validate(updateUsuarioSchema), usuarioController.update);
router.delete("/:id", usuarioController.remove);

export default router;
