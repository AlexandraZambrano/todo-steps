import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Creamos una constante register que sera nuestro controlador para manejar el registro de nuevos usuarios
export const register = async (req, res) => {
    // creu una constante que guarda username, email y password y que coloco como igual a req.body de manera que mi controlador pueda recuperar informaci[on que intriduxca en el cuerpo de mi request
    const { username, email, password } = req.body
    
    //Creo un bloque de try catch
    try {

        //creamos una varaible que verifica que el email que se intenta registrar no existe ya en la base de datos
        const existingEmail = await User.findOne({ email: email })
        //Si lo encuentra, nos devulve una respuesta de status 400
        if(existingEmail){
            return res.status(400).json({ message: "The email already exists" })
        }

        //creamos una variable salt(recordemos que una salt se refiere una pieza random de data que hace que vuestro hash sea mucho mas seguro contra ataques de fuerza bruta, por ejemplo)
        //El numero dentro de nuestra funcion hash se refiere al numero de iteraciones que se tendra sobre esa data random en dicho hash, por lo que no sera el mismo dos veces 
        const salt = await bcrypt.genSalt(10)

        //Finalmente generamos un hash utilizando el metodo hash y pasandole como parametros, la contrase;a que se recibe en el cuerpo de la request y el salt que acabamos de generar
        const hashPassword = await bcrypt.hash(password, salt)

        //creamos una constante user que itera sobre el objeto User(que proviene de nuestro modelo), y donde le pasamos las keys y los valores por los que se va a definir y que va a esperar del cuerpo de la request
        const user = new User({
            username: username,
            email: email,
            password: hashPassword
        })

        //Persistimos la informacion alojada en cada nueva instancia de nuestro objeto
        await user.save()

        //Para finalizar nuestra api, devolvemos un mensaje de exito si el try es exitoso
        res.status(200).json({message: "User has been created successfully", user})
    } catch (error) {

        //En caso de no ser exitoso pasamos al catch y devolvemos un mensaje de error
        res.status(500).json({message: "Something must've gone wrong!"})
    }
}

//Funcion de login que sera nuestro controlador para generar un token que guarde la informacion que necesitamos del usuario
export const login = async (req, res) => {
    const { email, password } = req.body
    try {

        //Verificamos que el email este en la base de datos, esta vez si que necesitamos que este para continuar
        const user = await User.findOne({ email: email })

        //Definimos que si el email no existe en la base de datos devolvemos un mensaje de error 400, sino, pasa a comparar la contraseña dada por el usuario en el cuerpo de la request y aquella alojada en la base de datos y conectada con el email del usuario
        if(!user){
            return res.status(400).json({ message: "Incorrect email" })
        }else{
            const validPassword = await bcrypt.compare(password, user.password)

            //Si la contraseña es invalida, nuevamente devolvemos un mensaje de error
            if(!validPassword){
                return res.status(400).json({ message: "Invalid Password" })
            }
        }

        //Creamos una variable token, donde utilizamos nuestra libreria jwt y pasamos el metodo singg donde como parametros vamos a pasar id del usuario, username y role, y como parte final le paso mi llave secreta(no se preocupen no sera esta siempre y tampoco se vera asi para la siguente parte)
        const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, '12345678910')

        //Envio mi token atraves de un header llamado "auth-token", y como respuesta en json envio el token, tambien cambiara para la siguiente actualizacion
        await res.header({
            "auth-token": token
        })

        res.json({ token })
    } catch (error) {
        //Si esto no se cumple entonces salta a una respuesta erronea
        res.status(500).json({message: "Something must've gone wrong!"})
    }
}