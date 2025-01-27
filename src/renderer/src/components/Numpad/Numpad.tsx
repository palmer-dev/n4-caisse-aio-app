import { useEffect, useState } from 'react'

type NumpadProps = {
  onChange: (value: string) => void
  value: string
}

const Numpad = ({ value, onChange }: NumpadProps): JSX.Element => {
  const [input, setInput] = useState<string>('')

  const handleClick = (value: string): void => {
    let newValue = input

    if (value === 'delete') {
      newValue = input.slice(0, -1) // Supprime le dernier caractère
    } else if (value === 'clear') {
      newValue = '' // Supprime tous les caractères
    } else {
      newValue = input + value // Ajoute le chiffre
    }

    setInput(newValue)

    // Appelle la fonction passée depuis le parent
    if (onChange) {
      onChange(newValue)
    }
  }

  useEffect(() => {
    setInput(value)
  }, [value])

  return (
    <div className="flex flex-col items-center w-full">
      {/* Boutons du Numpad */}
      <div className="grid grid-cols-3 gap-2 w-full">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            className="aspect-square p-5 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            onClick={() => handleClick(num.toString())}
          >
            {num}
          </button>
        ))}
        <button
          className="aspect-square p-5 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
          onClick={() => handleClick('clear')}
        >
          C
        </button>
        <button
          className="aspect-square p-5 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          onClick={() => handleClick('0')}
        >
          0
        </button>
        <button
          className="aspect-square p-5 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
          onClick={() => handleClick('delete')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 m-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Numpad
