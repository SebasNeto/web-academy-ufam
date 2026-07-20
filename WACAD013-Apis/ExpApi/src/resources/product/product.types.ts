export type CreateProductDTO = {
    name: string;
    price: number;
    stockQuantity: number;
};

export type UpdateProductDTO = {
    name?: string;
    price?: number;
    stockQuantity?: number;
};