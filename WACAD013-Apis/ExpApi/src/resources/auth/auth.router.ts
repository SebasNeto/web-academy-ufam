import { Router } from "express";

import validate from "../../middlewares/validate";
import authController from "./auth.controller";
import { loginSchema, signupSchema } from "./auth.schema";

const router = Router();

/**
 * @openapi
 * /auth:
 *   post:
 *     summary: Registra um novo cliente
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Signup'
 *     responses:
 *       201:
 *         description: Cliente cadastrado
 *       409:
 *         description: Email já cadastrado
 *   put:
 *     summary: Realiza o login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login realizado e cookie de sessão criado
 *       401:
 *         description: Credenciais inválidas
 *   delete:
 *     summary: Encerra a sessão do usuário
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout realizado
 */
router.post("/", validate(signupSchema), authController.signup);
router.put("/", validate(loginSchema), authController.login);
router.delete("/", authController.logout);

// Também mantém os caminhos nominais apresentados nos slides.
router.post("/signup", validate(signupSchema), authController.signup);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authController.logout);

export default router;
