import { useSimulateSaleMutation } from '@renderer/data/services/sales/salesExtendedApi.ts'
import { FC, useEffect, useState } from 'react'
import { useAppSelector } from '@stores/hook.js'
import { selectProducts } from '@services/carts/cartSlice.js'
import { ISimulation } from '@services/sales/types.js'
import { CurrencyFormatter } from '@renderer/lib/CurrencuFormatter.js'

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
      <>
        <span className={'font-bold'}>
          Sous-total : {new CurrencyFormatter().format(lastResult?.subtotal ?? 0)}
        </span>
        <span className={'font-bold'}>
          Total : {new CurrencyFormatter().format(lastResult?.grand_total ?? 0)}
        </span>
      </>
    </div>
  )
}

export default TotalRows
