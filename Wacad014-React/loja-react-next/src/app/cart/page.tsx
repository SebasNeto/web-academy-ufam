'use client'

import { useState } from 'react'
import CartList from '@/app/components/CartList/CartList'
import CartSummary from '@/app/components/CartSummary/CartSummary'
import { mockCartItems } from '@/app/mocks/cart-items'
import { CartItemData } from '@/app/types/cart'

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemData[]>(mockCartItems)

  const removeItemFromCart = (id: string): void => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    )
  }

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantidade,
    0,
  )
  const totalValue = cartItems.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0,
  )

  return (
    <div className='container p-4 p-md-5'>
      <CartList
        items={cartItems}
        removeItemFromCart={removeItemFromCart}
      />
      <CartSummary totalItems={totalItems} totalValue={totalValue} />
    </div>
  )
}

