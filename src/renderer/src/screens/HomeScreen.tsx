import WindowTitle from '@components/WindowTitle.tsx'
import Layout from '@renderer/components/Layout/Layout.tsx'
import ProductList from '@renderer/components/ProductList/ProductList.tsx'
import SaleRecap from '@components/SaleRecap/SaleRecap.js'

const HomeScreen = (): JSX.Element => {
  return (
    <>
      <WindowTitle title={'Dashboard'} />
      <Layout>
        <Layout.Content>
          <ProductList />
        </Layout.Content>
        <Layout.Sidebar>
          <SaleRecap />
        </Layout.Sidebar>
      </Layout>
    </>
  )
}

export default HomeScreen
