import express from "express"
import cors from 'cors'

import {dbConnection} from './database/db.js'

import todosRoutes from './routes/todos.routes.js'
import authRoutes from './routes/auth.routes.js'

const app =  express()

app.use(express.json())
app.use(cors())

dbConnection()

app.use("/todos", todosRoutes)
app.use("/auth", authRoutes)

app.listen(5000, console.log('connected to the port'))