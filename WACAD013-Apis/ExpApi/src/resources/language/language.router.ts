import { Router } from "express";

import languageController from "./language.controller";

const router = Router();

/**
 * @openapi
 * /languages/change:
 *   get:
 *     summary: Altera o idioma salvo no cookie lang
 *     tags: [Idioma]
 *     parameters:
 *       - name: lang
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pt-BR, en-US]
 *     responses:
 *       200:
 *         description: Idioma alterado
 *       400:
 *         description: Idioma inválido
 */
// Rota mostrada no código dos slides.
router.get("/change", languageController.changeLanguage);

/**
 * @openapi
 * /languages:
 *   post:
 *     summary: Altera o idioma usando o corpo da requisição
 *     tags: [Idioma]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [lang]
 *             properties:
 *               lang:
 *                 type: string
 *                 enum: [pt-BR, en-US]
 *     responses:
 *       200:
 *         description: Idioma alterado
 *       400:
 *         description: Idioma inválido
 */
// Rota POST mostrada no exemplo de teste dos slides.
router.post("/", languageController.changeLanguage);

export default router;
