import express from "express";

import productRouter from "../resources/product/product.router";

const router = express.Router();

router.use("/products", productRouter);

export default router;