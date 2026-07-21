export interface ProductPhoto {
  titulo: string
  src: string
}

export interface Product {
  id: string
  fotos: ProductPhoto[]
  nome: string
  preco: string
  desconto: number
  descricao: string
  vendido: 'true' | 'false'
  usuario_id: string
}

