import { useParams, useNavigate } from 'react-router-dom'
import { Button, Badge, SpecCard } from '../components/ui'

const ALL_CARS = [
  { id:1,  brand:'Porsche',       model:'911 Carrera S',      price:'R$ 980.000',   hp:450, torque:'530 Nm', acc:'3.7s', topSpeed:'308 km/h', engine:'3.0 Biturbo',  trans:'PDK 8v',    drive:'Traseira', fuel:'Gasolina',  cons:'11,4 km/l', length:'4.519mm', width:'1.852mm', height:'1.300mm', trunk:'132L',  category:'esportivo', bg:'#dce9ff',
    pros:['Motor boxer potente e refinado','Dirigibilidade excepcional','Acabamento premium','Valor de revenda alto'],
    cons:['Preço elevado','Porta-malas pequeno','Custo de manutenção alto','Espaço traseiro limitado'] },
  { id:2,  brand:'BMW',           model:'M4 Competition',     price:'R$ 985.000',   hp:510, torque:'650 Nm', acc:'3.9s', topSpeed:'290 km/h', engine:'3.0 Biturbo',  trans:'M DCT 8v',  drive:'Traseira', fuel:'Gasolina',  cons:'10,8 km/l', length:'4.794mm', width:'1.887mm', height:'1.393mm', trunk:'440L',  category:'esportivo', bg:'#d3e4fe',
    pros:['Motor S58 de alto desempenho','Torque impressionante','Design arrojado','Tecnologia avançada'],
    cons:['Direção elétrica artificial','Consumo elevado','Preço alto','Traseira larga pode assustar'] },
  { id:3,  brand:'Audi',          model:'RS e-tron GT',       price:'R$ 1.100.000', hp:646, torque:'830 Nm', acc:'3.3s', topSpeed:'250 km/h', engine:'Elétrico Dual',trans:'1v auto',   drive:'Integral', fuel:'Elétrico',  cons:'5.9 km/kWh',length:'4.989mm', width:'1.964mm', height:'1.414mm', trunk:'366L',  category:'eletrico',  bg:'#e5eeff',
    pros:['Aceleração brutal','Zero emissões','Design escultural','Tração integral precisa'],
    cons:['Autonomia limitada no Brasil','Recarga lenta em 110V','Preço muito elevado','Infraestrutura de recarga escassa'] },
  { id:4,  brand:'Mercedes-Benz', model:'AMG G 63',           price:'R$ 1.850.000', hp:585, torque:'850 Nm', acc:'4.5s', topSpeed:'220 km/h', engine:'4.0 Biturbo V8',trans:'AMG 9v',   drive:'Integral', fuel:'Gasolina',  cons:'7.2 km/l',  length:'4.763mm', width:'1.931mm', height:'1.969mm', trunk:'688L',  category:'suv',       bg:'#cbdbf5',
    pros:['Ícone off-road','V8 biturbo sonoro','Luxo absoluto','Capacidade todo-terreno imbatível'],
    cons:['Consumo muito alto','Tamanho dificulta manobras','Preço estratosférico','Dinâmica de estrada básica'] },
  { id:5,  brand:'Toyota',        model:'Corolla Cross',      price:'R$ 185.000',   hp:177, torque:'188 Nm', acc:'9.2s', topSpeed:'180 km/h', engine:'2.0 Híbrido',  trans:'CVT',       drive:'Dianteira',fuel:'Híbrido',   cons:'16.2 km/l', length:'4.460mm', width:'1.825mm', height:'1.620mm', trunk:'440L',  category:'suv',       bg:'#dce9ff',
    pros:['Consumo excelente','Confiabilidade Toyota','Bom espaço interno','Tecnologia híbrida acessível'],
    cons:['Motor sem emoção','Design conservador','CVT pode ser lento','Sem opção diesel'] },
  { id:6,  brand:'Honda',         model:'Civic Touring',      price:'R$ 198.000',   hp:174, torque:'220 Nm', acc:'8.1s', topSpeed:'210 km/h', engine:'1.5 Turbo',    trans:'CVT',       drive:'Dianteira',fuel:'Gasolina',  cons:'14.1 km/l', length:'4.674mm', width:'1.802mm', height:'1.415mm', trunk:'519L',  category:'sedan',     bg:'#d3e4fe',
    pros:['Interior espaçoso','Porta-malas grande','Motor turbo eficiente','Honda Sensing completo'],
    cons:['Design discreto','CVT sem modo manual','Preço salgado na versão topo','Suspensão um pouco dura'] },
  { id:7,  brand:'Volkswagen',    model:'Golf GTI',           price:'R$ 240.000',   hp:245, torque:'370 Nm', acc:'6.3s', topSpeed:'250 km/h', engine:'2.0 TSI',      trans:'DSG 7v',    drive:'Dianteira',fuel:'Gasolina',  cons:'12.5 km/l', length:'4.284mm', width:'1.799mm', height:'1.452mm', trunk:'380L',  category:'hatch',     bg:'#e5eeff',
    pros:['O hatch esportivo de referência','DSG preciso e rápido','Interior premium','Custo-benefício entre esportivos'],
    cons:['Sem tração integral','Custo de manutenção acima da média','Sem versão manual no Brasil','Concorrência acirrada'] },
  { id:8,  brand:'Jeep',          model:'Compass Limited',    price:'R$ 230.000',   hp:185, torque:'270 Nm', acc:'8.8s', topSpeed:'195 km/h', engine:'2.0 Flex',     trans:'Auto 9v',   drive:'Dianteira',fuel:'Gasolina',  cons:'10.8 km/l', length:'4.411mm', width:'1.858mm', height:'1.654mm', trunk:'438L',  category:'suv',       bg:'#cbdbf5',
    pros:['Visual imponente','Boa oferta de versões','Espaço generoso','Motor flex'],
    cons:['Qualidade de montagem variável','Consumo mediano','Custo de peças importadas','Suspensão firme demais'] },
  { id:9,  brand:'Ferrari',       model:'Roma Spider',        price:'R$ 3.200.000', hp:620, torque:'760 Nm', acc:'3.4s', topSpeed:'320 km/h', engine:'3.9 V8 Turbo', trans:'DCT 8v',    drive:'Traseira', fuel:'Gasolina',  cons:'9.1 km/l',  length:'4.656mm', width:'1.974mm', height:'1.298mm', trunk:'200L',  category:'esportivo', bg:'#dce9ff',
    pros:['Desempenho de supercar','Design italiano atemporal','Conversível exclusivo','V8 sonoro e feroz'],
    cons:['Preço proibitivo','Manutenção caríssima','Uso cotidiano impraticável','Lista de espera longa'] },
  { id:10, brand:'Hyundai',       model:'HB20 Diamond',       price:'R$ 99.000',    hp:116, torque:'146 Nm', acc:'10.1s',topSpeed:'175 km/h', engine:'1.0 Turbo',    trans:'Auto 6v',   drive:'Dianteira',fuel:'Gasolina',  cons:'13.8 km/l', length:'4.070mm', width:'1.734mm', height:'1.505mm', trunk:'300L',  category:'hatch',     bg:'#d3e4fe',
    pros:['Preço acessível','Garantia de 5 anos','Consumo eficiente','Bom equipamento de série'],
    cons:['Motor básico','Acabamento simples','Câmbio antigo','Sem versão turbo mais potente no auto'] },
  { id:11, brand:'Tesla',         model:'Model 3 Long Range', price:'R$ 450.000',   hp:358, torque:'493 Nm', acc:'4.2s', topSpeed:'233 km/h', engine:'Elétrico Dual',trans:'1v auto',   drive:'Integral', fuel:'Elétrico',  cons:'6.5 km/kWh',length:'4.720mm', width:'1.849mm', height:'1.443mm', trunk:'594L',  category:'sedan',     bg:'#e5eeff',
    pros:['Autonomia longa','Supercharger network','Tecnologia de ponta','Custo de recarga baixo'],
    cons:['Preço elevado no Brasil','Impostos de importação altos','Serviço limitado no BR','Interface pode distrair'] },
  { id:12, brand:'Toyota',        model:'Hilux GR Sport',     price:'R$ 365.000',   hp:224, torque:'500 Nm', acc:'9.5s', topSpeed:'175 km/h', engine:'2.8 Diesel',   trans:'Auto 6v',   drive:'Integral', fuel:'Diesel',    cons:'10.2 km/l', length:'5.330mm', width:'1.855mm', height:'1.815mm', trunk:'750L',  category:'picape',    bg:'#cbdbf5',
    pros:['Confiabilidade lendária','Torque diesel imbatível','Capacidade de carga','Versão GR esportiva'],
    cons:['Consumo em cidade','Cabine barulhenta','Suspensão dura vazia','Preço alto'] },
]

const PERF_BARS = (car) => [
  { label:'Potência',     value: Math.min(car.hp / 700 * 100, 100) },
  { label:'Aceleração',   value: Math.max(100 - (parseFloat(car.acc) / 12 * 100), 10) },
  { label:'Velocidade',   value: Math.min(parseInt(car.topSpeed) / 350 * 100, 100) },
]

export function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const car = ALL_CARS.find(c => c.id === Number(id))

  if (!car) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <span className="material-symbols-outlined text-outline-variant" style={{fontSize:56}}>directions_car</span>
      <p className="text-on-surface-variant font-medium">Veículo não encontrado</p>
      <Button variant="primary" onClick={() => navigate('/catalogo')}>Ver catálogo</Button>
    </div>
  )

  const perfBars = PERF_BARS(car)

  return (
    <div className="min-h-screen bg-surface">

      {/* Hero */}
      <section className="w-full py-12" style={{background:`linear-gradient(135deg, ${car.bg} 0%, #f8f9ff 100%)`}}>
        <div className="max-w-app mx-auto px-6">
          <button onClick={() => navigate('/catalogo')} className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-on-surface mb-6 transition-colors">
            <span className="material-symbols-outlined" style={{fontSize:16}}>arrow_back</span> Voltar ao catálogo
          </button>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* SVG do carro */}
            <div className="flex-1 flex items-center justify-center min-h-[220px]">
              <svg viewBox="0 0 500 260" className="w-full max-w-md opacity-20" fill="#0b1c30">
                <path d="M40 190 Q40 150 80 140 L150 110 Q190 80 240 75 L360 75 Q420 76 450 130 L470 180 Q475 195 465 200 L50 200 Q40 200 40 190Z"/>
                <ellipse cx="120" cy="200" rx="38" ry="38"/>
                <ellipse cx="370" cy="200" rx="38" ry="38"/>
                <rect x="160" y="85" width="160" height="55" rx="12"/>
              </svg>
            </div>
            {/* Info */}
            <div className="flex-1 flex flex-col gap-4">
              <Badge variant={car.fuel === 'Elétrico' ? 'electric' : car.fuel === 'Híbrido' ? 'success' : 'default'}>
                {car.fuel}
              </Badge>
              <div>
                <p className="text-sm font-bold tracking-widest uppercase text-on-surface-variant">{car.brand}</p>
                <h1 className="text-4xl font-black tracking-tight text-on-surface">{car.model}</h1>
              </div>
              <p className="text-3xl font-bold text-on-surface">{car.price}</p>
              <div className="flex gap-3 flex-wrap">
                <Button variant="primary" size="lg" onClick={() => navigate('/comparar')}>
                  Comparar veículo
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate('/catalogo')}>
                  Ver catálogo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-app mx-auto px-6 py-12 flex flex-col gap-12">

        {/* Specs rápidas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <SpecCard icon="speed"             label="0–100 km/h"  value={car.acc} />
          <SpecCard icon="flash_on"          label="Potência"    value={`${car.hp} cv`} />
          <SpecCard icon="rotate_right"      label="Torque"      value={car.torque} />
          <SpecCard icon="local_gas_station" label="Consumo"     value={car.cons} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Especificações técnicas */}
            <Card title="Especificações Técnicas">
              <div className="divide-y divide-outline-variant/40">
                {[
                  ['Motor',         car.engine],
                  ['Potência',      `${car.hp} cv`],
                  ['Torque',        car.torque],
                  ['Transmissão',   car.trans],
                  ['Tração',        car.drive],
                  ['Combustível',   car.fuel],
                  ['0–100 km/h',    car.acc],
                  ['Vel. máxima',   car.topSpeed],
                  ['Consumo',       car.cons],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-3">
                    <span className="text-sm text-on-surface-variant">{label}</span>
                    <span className="text-sm font-semibold text-on-surface">{value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Dimensões */}
            <Card title="Dimensões">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  ['Comprimento', car.length],
                  ['Largura',     car.width],
                  ['Altura',      car.height],
                  ['Porta-malas', car.trunk],
                ].map(([label, value]) => (
                  <div key={label} className="bg-surface-low rounded-xl p-4 flex flex-col gap-1">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">{label}</span>
                    <span className="text-base font-bold text-on-surface">{value}</span>
                  </div>
                ))}
              </div>
            </Card>

          </div>

          {/* Coluna lateral */}
          <div className="flex flex-col gap-8">

            {/* Performance */}
            <Card title="Performance">
              <div className="flex flex-col gap-5">
                {perfBars.map(bar => (
                  <div key={bar.label} className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-xs font-semibold text-on-surface-variant">{bar.label}</span>
                      <span className="text-xs font-bold text-on-surface">{Math.round(bar.value)}%</span>
                    </div>
                    <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary-container rounded-full transition-all duration-700"
                        style={{width:`${bar.value}%`}} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Prós e Contras */}
            <Card title="Pontos Positivos">
              <ul className="flex flex-col gap-2">
                {car.pros.map(p => (
                  <li key={p} className="flex items-start gap-2 text-sm text-on-surface">
                    <span className="material-symbols-outlined text-green-600 shrink-0" style={{fontSize:16}}>check_circle</span>
                    {p}
                  </li>
                ))}
              </ul>
            </Card>

            <Card title="Pontos Negativos">
              <ul className="flex flex-col gap-2">
                {car.cons.map(c => (
                  <li key={c} className="flex items-start gap-2 text-sm text-on-surface">
                    <span className="material-symbols-outlined text-secondary shrink-0" style={{fontSize:16}}>cancel</span>
                    {c}
                  </li>
                ))}
              </ul>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl border border-outline-variant/50 p-6 flex flex-col gap-4">
      <h2 className="text-sm font-bold uppercase tracking-widest text-on-surface border-b border-outline-variant/50 pb-3">{title}</h2>
      {children}
    </div>
  )
}
