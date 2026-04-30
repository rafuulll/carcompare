import { Button, Badge, SpecCard, CarCard, Input, Select } from '../components/ui'

const mockCar = {
  id: 1, brand: 'Porsche', model: '911 Carrera S', price: 'R$ 980.000',
  hp: 450, acc: '3.7s', fuel: 'Gasolina', bg: '#dce9ff'
}

export function DesignSystem() {
  return (
    <div className="max-w-4xl mx-auto p-10 flex flex-col gap-12">
      <h1 className="text-4xl font-black tracking-tight text-on-surface">Design System</h1>

      <Section title="Buttons">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" icon="arrow_forward">Com ícone</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Melhor</Badge>
          <Badge variant="warning">Atenção</Badge>
          <Badge variant="electric">Elétrico</Badge>
        </div>
      </Section>

      <Section title="SpecCards">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <SpecCard icon="speed"             label="0–100 km/h" value="3.7s" />
          <SpecCard icon="settings"          label="Potência"   value="450 cv" />
          <SpecCard icon="swap_calls"        label="Câmbio"     value="PDK 7v" />
          <SpecCard icon="local_gas_station" label="Motor"      value="3.0 T" />
        </div>
      </Section>

      <Section title="Inputs">
        <div className="flex flex-wrap gap-4">
          <Input label="Buscar" icon="search" placeholder="Marca ou modelo..." />
          <Select label="Categoria" options={[
            { value: '', label: 'Todas' },
            { value: 'suv', label: 'SUV' },
            { value: 'sedan', label: 'Sedan' },
          ]} />
        </div>
      </Section>

      <Section title="CarCard">
        <div className="w-72">
          <CarCard car={mockCar} />
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-base font-semibold text-on-surface border-b border-outline-variant pb-2">{title}</h2>
      {children}
    </section>
  )
}
