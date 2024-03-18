import express from "express";
import { createTodo, deleteTodo, getATodo, getTodos, updateTodo } from "../controllers/todo.controller.js";
//Para generar las rutas necesito utilizar express.Router(), el cual lo defino como valor de mi variable router
const router = express.Router()

//Utilizo mi variable router para definir el metodo a usar(get, post, put, patch, delete) y el path a utilizar, para despues ingresar el controlador que va a ejecutarse
router.get("/", getTodos)
router.get("/:id", getATodo)
router.post("/", createTodo)
router.put("/:id", updateTodo)
router.delete("/:id", deleteTodo)

export default router //exporto router para ser capaz de utilizar las rutas