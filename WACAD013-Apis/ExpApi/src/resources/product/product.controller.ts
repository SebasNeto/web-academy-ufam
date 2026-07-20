import { Request, Response } from "express";

import * as productService from "./product.service";

async function index(req: Request, res: Response) {

    const products = await productService.getAllProducts();

    return res.status(200).json(products);

}

async function create(req: Request, res: Response) {

    const product = await productService.createProduct(req.body);

    return res.status(201).json(product);

}

async function read(req: Request, res: Response) {

    const id = Number(req.params.id);

    const product = await productService.getProduct(id);

    if (!product) {

        return res.status(404).json({
            message: "Produto não encontrado",
        });

    }

    return res.status(200).json(product);

}

async function update(req: Request, res: Response) {

    const id = Number(req.params.id);

    try {

        const product = await productService.updateProduct(
            id,
            req.body
        );

        return res.status(200).json(product);

    } catch {

        return res.status(404).json({
            message: "Produto não encontrado",
        });

    }

}

async function remove(req: Request, res: Response) {

    const id = Number(req.params.id);

    try {

        await productService.deleteProduct(id);

        return res.sendStatus(204);

    } catch {

        return res.status(404).json({
            message: "Produto não encontrado",
        });

    }

}

export default {
    index,
    create,
    read,
    update,
    remove,
};