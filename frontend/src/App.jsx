import { Routes, Route } from 'react-router-dom'
import { Layout }       from './components/layout'
import { Home }         from './pages/Home'
import { Catalog }      from './pages/Catalog'
import { Detail }       from './pages/Detail'
import { Compare }      from './pages/Compare'
import { DesignSystem } from './pages/DesignSystem'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/catalogo"      element={<Catalog />} />
        <Route path="/carros/:id"    element={<Detail />} />
        <Route path="/comparar"      element={<Compare />} />
        <Route path="/design-system" element={<DesignSystem />} />
      </Routes>
    </Layout>
  )
}
