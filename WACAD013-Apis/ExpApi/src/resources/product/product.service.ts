import { prisma } from "../../lib/prisma";

import {
    CreateProductDTO,
    UpdateProductDTO,
} from "./product.types";

export async function getAllProducts() {
    return prisma.product.findMany();
}

export async function createProduct(data: CreateProductDTO) {

    return prisma.product.create({
        data,
    });

}

export async function getProduct(id: number) {

    return prisma.product.findUnique({
        where: {
            id,
        },
    });

}

export async function updateProduct(
    id: number,
    data: UpdateProductDTO
) {

    return prisma.product.update({
        where: {
            id,
        },
        data,
    });

}

export async function deleteProduct(id: number) {

    return prisma.product.delete({
        where: {
            id,
        },
    });

}