import WindowTitle from '@components/WindowTitle'

const HomeScreen = (): JSX.Element => {
  return (
    <>
      <WindowTitle title={'Dashboard'} />
      <h1 className={'text-2xl font-bold'}>Home</h1>
    </>
  )
}

export default HomeScreen
