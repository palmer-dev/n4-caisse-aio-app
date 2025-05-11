import { ChangeEvent, FC, useCallback } from 'react'

interface QuantityInputProps {
  quantity: number
  onChange: (newQuantity: number) => void
}

const QuantityInput: FC<QuantityInputProps> = ({ quantity, onChange }) => {
  const handleDecrement = useCallback(() => {
    if (quantity > 0) onChange(quantity - 1)
  }, [quantity])

  const handleIncrement = useCallback(() => {
    onChange(quantity + 1)
  }, [quantity])

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value >= 0) {
      onChange(value)
    }
  }, [])

  return (
    <div className="flex items-center border border-gray-500 rounded overflow-hidden w-full bg-gray-200">
      <button onClick={handleDecrement} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg">
        −
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        className="flex-1 pl-3 w-16 h-full text-center outline-none border-l border-r border-gray-500"
        min={0}
      />
      <button onClick={handleIncrement} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg">
        +
      </button>
    </div>
  )
}

export default QuantityInput
