import { useSimulateSaleMutation } from '@renderer/data/services/sales/salesExtendedApi.ts'
import { FC, useEffect, useState } from 'react'
import { useAppSelector } from '@stores/hook.js'
import { selectProducts } from '@services/carts/cartSlice.js'
import { ISimulation } from '@services/sales/types.js'
import { CurrencyFormatter } from '@renderer/lib/CurrencyFormatter.js'

const TotalRows: FC = () => {
  const cartItems = useAppSelector(selectProducts)
  const [simulate, { data: result, isLoading }] = useSimulateSaleMutation()
  const [lastResult, setLastResult] = useState<ISimulation | null>(null)

  useEffect(() => {
    simulate(cartItems)
  }, [cartItems])

  useEffect(() => {
    if (result && !isLoading) {
      setLastResult(result)
    }
  }, [result, isLoading])

  return (
    <div className={'py-4 px-5 flex flex-col'}>
      <table>
        <tbody>
          <tr>
            <td>Sous-total :</td>
            <td className={'font-bold text-right'}>
              {new CurrencyFormatter().format(lastResult?.subtotal ?? 0)}
            </td>
          </tr>
          {(lastResult?.discount ?? 0) > 0 && (
            <tr>
              <td>Promotion :</td>
              <td className={'font-bold text-right'}>
                {new CurrencyFormatter().format(lastResult?.discount ?? 0)}
              </td>
            </tr>
          )}
          {Object.entries(lastResult?.tax_breakdown ?? {}).map(([taxRate, taxValue]) => (
            <tr key={'vat-' + taxRate}>
              <td>TVA {taxRate} :</td>
              <td className={'font-bold text-right'}>{new CurrencyFormatter().format(taxValue)}</td>
            </tr>
          ))}
          <tr className={'text-2xl'}>
            <td className={'font-bold'}>Total :</td>
            <td className={'font-bold text-right'}>
              {new CurrencyFormatter().format(lastResult?.grand_total ?? 0)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TotalRows
