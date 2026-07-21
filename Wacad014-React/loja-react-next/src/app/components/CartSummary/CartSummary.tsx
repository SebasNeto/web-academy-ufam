interface CartSummaryProps {
  totalItems: number
  totalValue: number
}

export default function CartSummary({
  totalItems,
  totalValue,
}: CartSummaryProps) {
  return (
    <div className='card mb-4'>
      <div className='card-body'>
        <h5 className='card-title mb-4 fw-light'>Resumo do Carrinho</h5>
        <p className='card-text fw-medium'>Quantidade total: {totalItems}</p>
        <p className='card-text fw-medium mb-0'>
          Valor total: R${totalValue.toFixed(2)}
        </p>
      </div>
    </div>
  )
}

