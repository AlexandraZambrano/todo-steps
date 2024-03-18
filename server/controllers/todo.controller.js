import { Todo } from "../models/todo.model.js";

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find()

        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({message: "oh no! something went wrong!"})
    }

}

export const getATodo = async (req, res) => {
    const id = req.params.id

    try {
        const todos = await Todo.findById({ _id: id})

        res.status(200).json(todos)
    } catch (error) {
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