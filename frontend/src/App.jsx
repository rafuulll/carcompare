import { Routes, Route } from 'react-router-dom'
import { DesignSystem } from './pages/DesignSystem'

function Home()    { return <div style={{padding:40}}>🏠 Home</div> }
function Catalog() { return <div style={{padding:40}}>🚗 Catálogo</div> }
function Detail()  { return <div style={{padding:40}}>🔍 Detalhes</div> }
function Compare() { return <div style={{padding:40}}>⚖️ Comparar</div> }

export default function App() {
  return (
    <Routes>
      <Route path="/"             element={<Home />} />
      <Route path="/catalogo"     element={<Catalog />} />
      <Route path="/carros/:id"   element={<Detail />} />
      <Route path="/comparar"     element={<Compare />} />
      <Route path="/design-system" element={<DesignSystem />} />
    </Routes>
  )
}
