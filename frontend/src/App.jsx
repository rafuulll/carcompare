import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout'
import { DesignSystem } from './pages/DesignSystem'

function Home()    { return <div className="p-10">🏠 Home</div> }
function Catalog() { return <div className="p-10">🚗 Catálogo</div> }
function Detail()  { return <div className="p-10">🔍 Detalhes</div> }
function Compare() { return <div className="p-10">⚖️ Comparar</div> }

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
