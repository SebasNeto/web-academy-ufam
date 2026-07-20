export interface Product {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

export type ProductInput = Omit<Product, 'id'>;

const baseUrl = () =>
  `${process.env.JSON_SERVER_URL ?? 'http://localhost:3355'}/produtos`;

const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`JSON Server respondeu com o status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
};

const index = () => request<Product[]>(baseUrl());

const read = (id: string) => request<Product>(`${baseUrl()}/${id}`);

const create = (product: ProductInput) =>
  request<Product>(baseUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });

const update = (id: string, product: ProductInput) =>
  request<Product>(`${baseUrl()}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });

const remove = (id: string) =>
  request<void>(`${baseUrl()}/${id}`, { method: 'DELETE' });

export default { index, read, create, update, remove };
