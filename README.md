# 🚗 CarCompare

Plataforma web de comparação de carros — explore, analise e compare veículos de forma inteligente.

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Banco de Dados | PostgreSQL |
| Infraestrutura | Docker + Docker Compose |
| API Externa | Tabela FIPE |

## Como rodar localmente

### Pré-requisitos
- Docker e Docker Compose instalados

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/rafuulll/carcompare.git
cd carcompare

# 2. Copie o arquivo de variáveis de ambiente
cp .env.example .env

# 3. Suba os containers
docker compose up --build

# 4. Acesse
# Frontend: http://localhost:5173
# Backend:  http://localhost:3001/api/health
```

## Estrutura do projeto

```
carcompare/
├── frontend/        # React + Vite
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── services/
│       └── hooks/
├── backend/         # Node + Express
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── models/
│       ├── middlewares/
│       └── config/
├── docker-compose.yml
├── .env.example
└── README.md
```

## Funcionalidades

- 🔍 Busca e filtragem de carros
- 📊 Comparação lado a lado de veículos
- 💾 Favoritos salvos localmente
- 🔐 Sistema de login/logout
- 📧 Envio de email de contato
- 📱 Interface responsiva

## API Externa

Dados de veículos consumidos da [API FIPE](https://deividfortuna.github.io/fipe/).
