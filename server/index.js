import express from "express"
import cors from 'cors'

//importamos express y cors
//llamamos a nuestra funcion que nos conecta con la base de datos

import {dbConnection} from './database/db.js'

//llamo a las rutas que he creado anteriormente, nota que losn nombres que defino luego del import son variables en si, no son nombres de funciones
import todosRoutes from './routes/todos.routes.js'
import authRoutes from './routes/auth.routes.js'

//creo una variable app que ejecute express
const app =  express()

//Hago un app.use y dejar que se ejecute json para que las respuestas no tengan problemas al renderizar
app.use(express.json())
//ejecuto cors
app.use(cors())

//ejecuto mi funcion de coneccion con la base de datos
dbConnection()

//ejecuto mis rutas, no sin antes definir rutas base
app.use("/todos", todosRoutes)
app.use("/auth", authRoutes)

//Hago que mi server corra en el servido 500(podria ser cualquier otro), y que pinte un console log
app.listen(5000, console.log('connected to the port'))