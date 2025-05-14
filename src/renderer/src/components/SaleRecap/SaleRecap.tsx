import { FC, useCallback } from 'react'
import { selectProducts } from '@services/carts/cartSlice.js'
import { useAppSelector } from '@stores/hook.js'
import { CurrencyFormatter } from '@renderer/lib/CurrencyFormatter.js'
import TotalRows from './TotalRows.tsx'
import { MCartItem } from '@renderer/data/models/Cart/MCart.ts'

const SaleRecap: FC = () => {
  const products = useAppSelector(selectProducts)

  const handleRowClick = useCallback((cartItem: MCartItem) => {
    console.log('Clicked:', cartItem)
  }, [])

  return (
    <div className={'flex flex-col h-full border-l pt-5 backdrop-blur-xs'}>
      <div className={'flex flex-col h-full'}>
        <h2 className={'pl-5 font-bold text-xl'}>Ticket</h2>
        <div className={'flex-1 border-t-gray-200 py-4 px-5'}>
          <table className={'w-full text-sm'}>
            <thead>
              <tr>
                <th className={'px-4 py-2 border-b'} align={'left'}>
                  Produit
                </th>
                <th className={'px-4 py-2 border-b'}>Qty</th>
                <th className={'px-4 py-2 border-b'}>Prix</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  onClick={() => handleRowClick(p)}
                  key={p.sku}
                  className={'bg-red-50/20 odd:bg-white even:bg-gray-200'}
                >
                  <td className={'px-4 py-2 border-b'}>
                    {p.name}
                    <br />
                    {p.discounts.map((discount) => (
                      <i className={'text-[12px]'} key={discount.name}>
                        {discount.label}
                      </i>
                    ))}
                  </td>
                  <td className={'px-4 py-2 border-b text-center'} align={'center'}>
                    {p.quantity}
                  </td>
                  <td className={'px-4 py-2 border-b text-right'} align={'right'}>
                    {new CurrencyFormatter().format(p.final_price)}
                    {p.has_discount && (
                      <>
                        <br />
                        <s className={'text-[12px]'}>
                          {new CurrencyFormatter().format(p.unit_price_with_tax)}
                        </s>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr />
        <TotalRows />
      </div>
    </div>
  )
}

export default SaleRecap
