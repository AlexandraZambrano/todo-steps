import express from "express";
import { createTodo, deleteTodo, getATodo, getTodos, updateTodo } from "../controllers/todo.controller.js";

const router = express.Router()

router.get("/", getTodos)
router.get("/:id", getATodo)
router.post("/", createTodo)
router.put("/:id", updateTodo)
router.delete("/:id", deleteTodo)

export default router