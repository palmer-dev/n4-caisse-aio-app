import { FC } from 'react'

interface QuickActionProperties {
  children: string
  onClick: () => void
}

const QuickAction: FC<QuickActionProperties> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={'bg-red-600/10 aspect-square p-2 flex justify-center items-center'}
    >
      {children}
    </button>
  )
}

export default QuickAction
