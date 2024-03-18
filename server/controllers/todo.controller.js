import { Todo } from "../models/todo.model.js";

//Creo una funcion flecha asincrona que sera mi controlador para traer todas las tareas a hacer, paso como parametro req(request) y res(response), estas variables pueden llamarse como queramos pero convencionalmente suelen llamarse de esta manera
export const getTodos = async (req, res) => {
    try {
        //Dentro de nuestro bloque trycatch creamos un variable "todos" que utiliza el metodo .find del orm mongoose ya que estamos utilizando mongo en esta ocasion
        const todos = await Todo.find()

        //genero una respuesta en caso de ser positiva y que me devuelva todos los todos que enconetre en la base de datos
        res.status(200).json(todos)
    } catch (error) {
        //En caso que la respuesta vaya mal, devolvemos un codigo 500 y un mensaje de error
        res.status(500).json({message: "oh no! something went wrong!"})
    }

}

//Controlador para encontrar una lista de todo a partir de un id
export const getATodo = async (req, res) => {

    //Para usar el id llamo a params y le digo que encuentre una variable id, que ira en el path de mi endpoint en mi carpeta routes
    const id = req.params.id

    try {
        //Declaro una contante donde le pido al modelo encontrar por id una lista de todo
        const todos = await Todo.findById({ _id: id})

        //le pido que me devuelva la lista si la encuentra
        res.status(200).json(todos)
    } catch (error) {
        //Delvuelvo una respuesta de error si algo sale mal
        res.status(500).json({message: "oh no! something went wrong!"})
    }

}

export const createTodo = async (req, res) => {
    const { title, task, type } = req.body
    try {

        const todo = new Todo({
            title: title,
            task: task,
            type: type
        })

        await todo.save()
        res.status(200).json({message: "Todo list created successfully", todo})
    } catch (error) {
        res.status(500).json({message: "oh no! something went wrong!"})
    }

}

export const updateTodo = async (req, res) => {

    const id = req.params.id
    console.log(id)

    try {
        const todo = await Todo.updateOne({ _id: id }, req.body)
        console.log(todo)
        res.status(200).json({message: "Todo list updated successfully"})
    } catch (error) {
        res.status(500).json({message: "oh no! something went wrong!", error})
    }

}

export const deleteTodo = async (req, res) => {

    const id = req.params.id
    console.log(id)

    try {
        const todo = await Todo.deleteOne({ _id: id }, req.body)
        console.log(todo)
        res.status(200).json({message: "Todo list deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "oh no! something went wrong!", error})
    }

}