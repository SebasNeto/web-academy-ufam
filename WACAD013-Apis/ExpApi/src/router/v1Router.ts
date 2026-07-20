import express from "express";

import productRouter from "../resources/product/product.router";
import languageRouter from "../resources/language/language.router";
import usuarioRouter from "../resources/usuario/usuario.router";
import authRouter from "../resources/auth/auth.router";
import compraRouter from "../resources/compra/compra.router";

const router = express.Router();

router.use("/products", productRouter);
router.use("/produto", productRouter);
router.use("/languages", languageRouter);
router.use("/usuario", usuarioRouter);
router.use("/auth", authRouter);
router.use("/compra", compraRouter);

export default router;
