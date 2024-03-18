import mongoose from "mongoose"

//Genero un modelo con mongoose, declarando una funcion y dandole como valor la llamada a mongoose y usando su metodo .Schema para poder crear uno

//importnate recordar que espera un objeto asi que abrimo parentesis y llaves
const userSchema = mongoose.Schema({

    //Defino aquello que mi schema espera tener, keys y tipo de data esperada
    username: { type: String, require:true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, default: "user", enum: ["user", "admin"] }
})

//Exporto una variable todo que defino como igual a mongoose y su metodo .model para que defina como modelo de la tabla "users", el schema que hemos generado en la funcion de arriba.
export const User = mongoose.model("users", userSchema)