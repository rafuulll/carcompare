import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CarCompare API running 🚗' })
})

// Rotas (serão adicionadas nas próximas US)
// import carRoutes from './routes/cars.js'
// app.use('/api/cars', carRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
