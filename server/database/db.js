import mongoose from "mongoose"

//Hago mi conexion con la base de datos usando mongoose como ODM

//defino una funcion flecha que exporto y es asincrona
export const dbConnection = async () => {
    //Creo un bloque trycatch
    try {
        //De forma asincrona utilizo mongoose y su metodo connect donde le paso como parametro la cadena de conexion con mongo compass
        await mongoose.connect("mongodb://localhost:27017/todoProject")
        //Con un console.log compruebo que la conexion fue exitosa
        console.log("connected to database")
    } catch (error) {

        //Si algo va mal lo imprimo
        console.log(error, "something went wrong")
    }

}