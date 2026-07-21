'use client'

import CartItem from '@/app/components/CartItem/CartItem'
import { CartItemData } from '@/app/types/cart'

interface CartListProps {
  items: CartItemData[]
  removeItemFromCart: (id: string) => void
}

export default function CartList({
  items,
  removeItemFromCart,
}: CartListProps) {
  return (
    <div className='card mb-4'>
      <div className='row card-body'>
        <h5 className='card-title mb-4 fw-light'>Produtos selecionados</h5>
        <div className='table-responsive'>
          <table className='table align-middle'>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor Unitário</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  removeItemFromCart={removeItemFromCart}
                />
              ))}
              {items.length === 0 && (
                <tr>
                  <td className='text-center text-secondary py-4' colSpan={5}>
                    O carrinho está vazio.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

