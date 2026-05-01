import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Badge } from '../components/ui'

const ALL_CARS = [
  { id:1,  brand:'Porsche',       model:'911 Carrera S',      price:'R$ 980.000',   priceNum:980000,   hp:450, torque:'530 Nm', acc:'3.7s', topSpeed:'308 km/h', engine:'3.0 Biturbo',   trans:'PDK 8v',   drive:'Traseira', fuel:'Gasolina', cons:'11,4 km/l', length:'4.519mm', width:'1.852mm', height:'1.300mm', trunk:'132L',  bg:'#dce9ff' },
  { id:2,  brand:'BMW',           model:'M4 Competition',     price:'R$ 985.000',   priceNum:985000,   hp:510, torque:'650 Nm', acc:'3.9s', topSpeed:'290 km/h', engine:'3.0 Biturbo',   trans:'M DCT 8v', drive:'Traseira', fuel:'Gasolina', cons:'10,8 km/l', length:'4.794mm', width:'1.887mm', height:'1.393mm', trunk:'440L',  bg:'#d3e4fe' },
  { id:3,  brand:'Audi',          model:'RS e-tron GT',       price:'R$ 1.100.000', priceNum:1100000,  hp:646, torque:'830 Nm', acc:'3.3s', topSpeed:'250 km/h', engine:'Elétrico Dual', trans:'1v auto',  drive:'Integral', fuel:'Elétrico', cons:'5.9 km/kWh',length:'4.989mm', width:'1.964mm', height:'1.414mm', trunk:'366L',  bg:'#e5eeff' },
  { id:4,  brand:'Mercedes-Benz', model:'AMG G 63',           price:'R$ 1.850.000', priceNum:1850000,  hp:585, torque:'850 Nm', acc:'4.5s', topSpeed:'220 km/h', engine:'4.0 V8 Turbo',  trans:'AMG 9v',   drive:'Integral', fuel:'Gasolina', cons:'7.2 km/l',  length:'4.763mm', width:'1.931mm', height:'1.969mm', trunk:'688L',  bg:'#cbdbf5' },
  { id:5,  brand:'Toyota',        model:'Corolla Cross',      price:'R$ 185.000',   priceNum:185000,   hp:177, torque:'188 Nm', acc:'9.2s', topSpeed:'180 km/h', engine:'2.0 Híbrido',   trans:'CVT',      drive:'Dianteira',fuel:'Híbrido',  cons:'16.2 km/l', length:'4.460mm', width:'1.825mm', height:'1.620mm', trunk:'440L',  bg:'#dce9ff' },
  { id:6,  brand:'Honda',         model:'Civic Touring',      price:'R$ 198.000',   priceNum:198000,   hp:174, torque:'220 Nm', acc:'8.1s', topSpeed:'210 km/h', engine:'1.5 Turbo',     trans:'CVT',      drive:'Dianteira',fuel:'Gasolina', cons:'14.1 km/l', length:'4.674mm', width:'1.802mm', height:'1.415mm', trunk:'519L',  bg:'#d3e4fe' },
  { id:7,  brand:'Volkswagen',    model:'Golf GTI',           price:'R$ 240.000',   priceNum:240000,   hp:245, torque:'370 Nm', acc:'6.3s', topSpeed:'250 km/h', engine:'2.0 TSI',       trans:'DSG 7v',   drive:'Dianteira',fuel:'Gasolina', cons:'12.5 km/l', length:'4.284mm', width:'1.799mm', height:'1.452mm', trunk:'380L',  bg:'#e5eeff' },
  { id:8,  brand:'Jeep',          model:'Compass Limited',    price:'R$ 230.000',   priceNum:230000,   hp:185, torque:'270 Nm', acc:'8.8s', topSpeed:'195 km/h', engine:'2.0 Flex',      trans:'Auto 9v',  drive:'Dianteira',fuel:'Gasolina', cons:'10.8 km/l', length:'4.411mm', width:'1.858mm', height:'1.654mm', trunk:'438L',  bg:'#cbdbf5' },
  { id:9,  brand:'Ferrari',       model:'Roma Spider',        price:'R$ 3.200.000', priceNum:3200000,  hp:620, torque:'760 Nm', acc:'3.4s', topSpeed:'320 km/h', engine:'3.9 V8 Turbo',  trans:'DCT 8v',   drive:'Traseira', fuel:'Gasolina', cons:'9.1 km/l',  length:'4.656mm', width:'1.974mm', height:'1.298mm', trunk:'200L',  bg:'#dce9ff' },
  { id:10, brand:'Hyundai',       model:'HB20 Diamond',       price:'R$ 99.000',    priceNum:99000,    hp:116, torque:'146 Nm', acc:'10.1s',topSpeed:'175 km/h', engine:'1.0 Turbo',     trans:'Auto 6v',  drive:'Dianteira',fuel:'Gasolina', cons:'13.8 km/l', length:'4.070mm', width:'1.734mm', height:'1.505mm', trunk:'300L',  bg:'#d3e4fe' },
  { id:11, brand:'Tesla',         model:'Model 3 Long Range', price:'R$ 450.000',   priceNum:450000,   hp:358, torque:'493 Nm', acc:'4.2s', topSpeed:'233 km/h', engine:'Elétrico Dual', trans:'1v auto',  drive:'Integral', fuel:'Elétrico', cons:'6.5 km/kWh',length:'4.720mm', width:'1.849mm', height:'1.443mm', trunk:'594L',  bg:'#e5eeff' },
  { id:12, brand:'Toyota',        model:'Hilux GR Sport',     price:'R$ 365.000',   priceNum:365000,   hp:224, torque:'500 Nm', acc:'9.5s', topSpeed:'175 km/h', engine:'2.8 Diesel',    trans:'Auto 6v',  drive:'Integral', fuel:'Diesel',   cons:'10.2 km/l', length:'5.330mm', width:'1.855mm', height:'1.815mm', trunk:'750L',  bg:'#cbdbf5' },
]

// Campos comparáveis com lógica de "melhor"
const ROWS = [
  { key:'price',    label:'Preço',          better:'min', format: c => c.price },
  { key:'hp',       label:'Potência',       better:'max', format: c => `${c.hp} cv` },
  { key:'torque',   label:'Torque',         better:'max', format: c => c.torque },
  { key:'acc',      label:'0–100 km/h',     better:'min', format: c => c.acc },
  { key:'topSpeed', label:'Vel. máxima',    better:'max', format: c => c.topSpeed },
  { key:'engine',   label:'Motor',          better:null,  format: c => c.engine },
  { key:'trans',    label:'Transmissão',    better:null,  format: c => c.trans },
  { key:'drive',    label:'Tração',         better:null,  format: c => c.drive },
  { key:'fuel',     label:'Combustível',    better:null,  format: c => c.fuel },
  { key:'cons',     label:'Consumo',        better:null,  format: c => c.cons },
  { key:'length',   label:'Comprimento',    better:null,  format: c => c.length },
  { key:'width',    label:'Largura',        better:null,  format: c => c.width },
  { key:'height',   label:'Altura',         better:null,  format: c => c.height },
  { key:'trunk',    label:'Porta-malas',    better:'max', format: c => c.trunk },
]

function numericVal(car, key) {
  const v = car[key]
  if (typeof v === 'number') return v
  return parseFloat(String(v).replace(/[^\d.]/g,'')) || 0
}

function getBetter(cars, key, better) {
  if (!better || cars.length < 2) return null
  const vals = cars.map(c => numericVal(c, key === 'price' ? { price: c.priceNum } : c, key === 'price' ? 'price' : key))
  const vals2 = cars.map(c => key === 'price' ? c.priceNum : numericVal(c, key))
  const best = better === 'max' ? Math.max(...vals2) : Math.min(...vals2)
  return vals2.map(v => v === best)
}

export function Compare() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState([null, null])

  function pick(slot, id) {
    const car = ALL_CARS.find(c => c.id === Number(id)) || null
    setSelected(prev => { const next = [...prev]; next[slot] = car; return next })
  }

  function remove(slot) {
    setSelected(prev => { const next = [...prev]; next[slot] = null; return next })
  }

  const activeCars = selected.filter(Boolean)

  return (
    <div className="min-h-screen bg-surface">

      {/* Header */}
      <div className="bg-white border-b border-outline-variant/50">
        <div className="max-w-app mx-auto px-6 py-8">
          <p className="text-[11px] font-bold tracking-widest uppercase text-primary-container mb-1">Ferramentas</p>
          <h1 className="text-3xl font-bold text-on-surface">Comparar veículos</h1>
          <p className="text-on-surface-variant text-sm mt-1">Selecione até 2 carros para comparar lado a lado</p>
        </div>
      </div>

      <div className="max-w-app mx-auto px-6 py-10 flex flex-col gap-10">

        {/* Seletores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0, 1].map(slot => (
            <div key={slot}>
              {selected[slot] ? (
                <div className="bg-white rounded-xl border border-outline-variant/50 p-5 flex items-center gap-4">
                  <div className="w-20 h-16 rounded-lg flex items-center justify-center shrink-0" style={{background: selected[slot].bg}}>
                    <svg viewBox="0 0 500 260" className="w-full opacity-20" fill="#0b1c30">
                      <path d="M40 190 Q40 150 80 140 L150 110 Q190 80 240 75 L360 75 Q420 76 450 130 L470 180 Q475 195 465 200 L50 200 Q40 200 40 190Z"/>
                      <ellipse cx="120" cy="200" rx="38" ry="38"/>
                      <ellipse cx="370" cy="200" rx="38" ry="38"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">{selected[slot].brand}</p>
                    <p className="font-bold text-on-surface truncate">{selected[slot].model}</p>
                    <p className="text-sm font-semibold text-on-surface-variant">{selected[slot].price}</p>
                  </div>
                  <button onClick={() => remove(slot)} className="p-1.5 hover:bg-surface-low rounded-full transition-colors text-on-surface-variant">
                    <span className="material-symbols-outlined" style={{fontSize:18}}>close</span>
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-xl border-2 border-dashed border-outline-variant/70 p-5 flex flex-col gap-3">
                  <p className="text-sm font-semibold text-on-surface-variant">Carro {slot + 1}</p>
                  <select onChange={e => pick(slot, e.target.value)} defaultValue=""
                    className="w-full bg-surface-low rounded-lg py-2.5 px-3 text-sm text-on-surface outline-none border border-transparent focus:border-primary-container cursor-pointer">
                    <option value="" disabled>Selecionar veículo...</option>
                    {ALL_CARS.filter(c => c.id !== selected[slot === 0 ? 1 : 0]?.id).map(c => (
                      <option key={c.id} value={c.id}>{c.brand} {c.model}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tabela comparativa */}
        {activeCars.length === 2 ? (
          <div className="bg-white rounded-xl border border-outline-variant/50 overflow-hidden">

            {/* Cabeçalho */}
            <div className="grid border-b border-outline-variant/50" style={{gridTemplateColumns:'200px repeat(2, 1fr)'}}>
              <div className="p-4 bg-surface-low" />
              {activeCars.map(car => (
                <div key={car.id} className="p-5 flex flex-col items-center gap-1 border-l border-outline-variant/50">
                  <div className="w-16 h-12 rounded-lg flex items-center justify-center" style={{background: car.bg}}>
                    <svg viewBox="0 0 500 260" className="w-full opacity-20" fill="#0b1c30">
                      <path d="M40 190 Q40 150 80 140 L150 110 Q190 80 240 75 L360 75 Q420 76 450 130 L470 180 Q475 195 465 200 L50 200 Q40 200 40 190Z"/>
                      <ellipse cx="120" cy="200" rx="38" ry="38"/>
                    </svg>
                  </div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">{car.brand}</p>
                  <p className="font-bold text-on-surface text-center text-sm">{car.model}</p>
                  <Badge variant={car.fuel === 'Elétrico' ? 'electric' : 'default'}>{car.fuel}</Badge>
                </div>
              ))}
            </div>

            {/* Linhas */}
            {ROWS.map((row, i) => {
              const betterArr = getBetter(activeCars, row.key, row.better)
              return (
                <div key={row.key}
                  className={`grid items-stretch ${i % 2 === 0 ? 'bg-white' : 'bg-surface-low/40'}`}
                  style={{gridTemplateColumns:'200px repeat(2, 1fr)'}}>
                  <div className="px-5 py-3.5 flex items-center">
                    <span className="text-xs font-bold tracking-wide uppercase text-on-surface-variant">{row.label}</span>
                  </div>
                  {activeCars.map((car, ci) => {
                    const isBetter = betterArr?.[ci]
                    return (
                      <div key={car.id}
                        className={`px-5 py-3.5 flex items-center justify-center border-l border-outline-variant/50 text-sm font-semibold text-on-surface
                          ${isBetter ? 'bg-green-50 text-green-700' : ''}`}>
                        {isBetter && <span className="material-symbols-outlined text-green-600 mr-1" style={{fontSize:14}}>arrow_upward</span>}
                        {row.format(car)}
                      </div>
                    )
                  })}
                </div>
              )
            })}

            {/* Ações */}
            <div className="grid border-t border-outline-variant/50" style={{gridTemplateColumns:'200px repeat(2, 1fr)'}}>
              <div className="p-4 bg-surface-low" />
              {activeCars.map(car => (
                <div key={car.id} className="p-4 flex justify-center border-l border-outline-variant/50">
                  <Button variant="outline" size="sm" onClick={() => navigate(`/carros/${car.id}`)}>
                    Ver detalhes
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white rounded-xl border border-outline-variant/50">
            <span className="material-symbols-outlined text-outline-variant" style={{fontSize:56}}>compare_arrows</span>
            <p className="text-on-surface-variant font-medium">Selecione 2 veículos para comparar</p>
            <Button variant="outline" onClick={() => navigate('/catalogo')}>
              Explorar catálogo
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
