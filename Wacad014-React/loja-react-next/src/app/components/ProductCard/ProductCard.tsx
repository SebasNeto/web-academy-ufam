'use client'

import Image from 'next/image'
import { Product } from '@/app/types/products'

interface ProductCardProps {
  product: Product
  addToCart: (product: Product) => void
}

export default function ProductCard({
  product,
  addToCart,
}: ProductCardProps) {
  const photo = product.fotos[0]

  return (
    <div className='col'>
      <article className='card shadow-sm h-100 product-card'>
        <Image
          src={photo.src}
          className='card-img-top product-image'
          alt={photo.titulo}
          width={500}
          height={360}
          sizes='(max-width: 767px) 100vw, (max-width: 991px) 50vw, 25vw'
        />
        <div className='card-body bg-light d-flex flex-column'>
          <h5 className='card-title'>{product.nome}</h5>
          <p className='card-text text-secondary'>R$ {product.preco}</p>
          <button
            className='btn btn-dark d-block w-100 mt-auto'
            type='button'
            onClick={() => addToCart(product)}
          >
            Adicionar no carrinho
          </button>
        </div>
      </article>
    </div>
  )
}

