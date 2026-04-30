import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout'
import { Home } from './pages/Home'
import { DesignSystem } from './pages/DesignSystem'

function Catalog() { return <div className="p-10">🚗 Catálogo — em breve</div> }
function Detail()  { return <div className="p-10">🔍 Detalhes — em breve</div> }
function Compare() { return <div className="p-10">⚖️ Comparar — em breve</div> }

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
