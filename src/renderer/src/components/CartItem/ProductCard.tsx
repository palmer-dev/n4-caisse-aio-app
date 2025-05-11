import { FC } from 'react'
import { useGetProductBySkuQuery } from '@renderer/data/services/skus/skusExtendedApi.ts'

interface ProductCard {
  sku: string
}

const ProductCard: FC<ProductCard> = ({ sku }) => {
  const { data: product, isLoading } = useGetProductBySkuQuery(sku)

  if (isLoading || product === undefined) return <div className={'aspect-square'}>Loading...</div>

  return (
    <div className={'aspect-square'}>
      <p>{product.name}</p>
    </div>
  )
}

export default ProductCard
