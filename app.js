import express from 'express'
import morgan from 'morgan'

import cors from 'cors'


import indexRoutes from './routes/index.routes.js'
import pacientesRoutes from './routes/pacientes.routes.js'
import loginRoutes from './routes/login.routes.js'
import doctoresRoutes from './routes/doctores.routes.js'
import enfermerosRoutes from './routes/enfermeros.routes.js'
import fichasRoutes from './routes/fichas.routes.js'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())


app.use(indexRoutes)
app.use(pacientesRoutes)
app.use(loginRoutes)
app.use(doctoresRoutes)
app.use(enfermerosRoutes)
app.use(fichasRoutes)




export default app