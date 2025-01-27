import { useEffect } from 'react'

const WindowTitle = ({ title }: { title: string }): JSX.Element => {
  useEffect(() => {
    window.api.display.updateTitle(title)
  }, [title])
  return <></>
}

export default WindowTitle
