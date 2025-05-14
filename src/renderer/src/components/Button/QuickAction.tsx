import { FC } from 'react'

interface QuickActionProperties {
  children: string
  onClick: () => void
}

const QuickAction: FC<QuickActionProperties> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        'dark:text-white  dark:bg-yellow-500/40 bg-yellow-500/60 aspect-square p-2 flex justify-center items-center text-2xl font-bold uppercase'
      }
    >
      {children}
    </button>
  )
}

export default QuickAction
