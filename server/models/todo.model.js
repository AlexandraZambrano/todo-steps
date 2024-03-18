import mongoose from "mongoose"

//Genero un modelo con mongoose, declarando una funcion y dandole como valor la llamada a mongoose y usando su metodo .Schema para poder crear uno

//importnate recordar que espera un objeto asi que abrimo parentesis y llaves
const todoSchema = mongoose.Schema({

    //Defino aquello que mi schema espera tener, keys y tipo de data esperada
    title: { type: String, require: true },
    task: { type:String, require:true },
    type: { type:String, enum: [ "work", "school", "free time" ] }
},
//Aca defino que esta bien que existan timestamps como createdAt y UpdatedAt
    {timestamp: true}
)

//Exporto una variable todo que defino como igual a mongoose y su metodo .model para que defina como modelo de la tabla "tasks", el schema que hemos generado en la funcion de arriba.
export const Todo = mongoose.model("tasks", todoSchema)