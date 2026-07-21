'use client'

import { CartItemData } from '@/app/types/cart'

interface CartItemProps {
  item: CartItemData
  removeItemFromCart: (id: string) => void
}

export default function CartItem({
  item,
  removeItemFromCart,
}: CartItemProps) {
  const productTotal = item.preco * item.quantidade

  return (
    <tr>
      <td>{item.nome}</td>
      <td>R$ {item.preco.toFixed(2)}</td>
      <td>{item.quantidade}</td>
      <td>R$ {productTotal.toFixed(2)}</td>
      <td>
        <button
          className='btn btn-danger btn-sm'
          type='button'
          onClick={() => removeItemFromCart(item.id)}
        >
          Remover
        </button>
      </td>
    </tr>
  )
}

