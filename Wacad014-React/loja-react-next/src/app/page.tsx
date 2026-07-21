'use client'

import { useState } from 'react'
import CartSummary from '@/app/components/CartSummary/CartSummary'
import ProductList from '@/app/components/ProductList/ProductList'
import { mockProducts } from '@/app/mocks/products'
import { Product } from '@/app/types/products'

export default function ProductsPage() {
  const [totalItems, setTotalItems] = useState<number>(0)
  const [totalValue, setTotalValue] = useState<number>(0)

  const addToCart = (product: Product): void => {
    setTotalItems((currentTotal) => currentTotal + 1)
    setTotalValue((currentTotal) => currentTotal + Number(product.preco))
  }

  return (
    <div className='container p-4 p-md-5'>
      <CartSummary totalItems={totalItems} totalValue={totalValue} />
      <ProductList products={mockProducts} addToCart={addToCart} />
    </div>
  )
}

