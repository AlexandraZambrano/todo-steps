import express from "express";
import { login, register } from "../controllers/auth.controller.js";

//Para generar las rutas necesito utilizar express.Router(), el cual lo defino como valor de mi variable router
const router =  express.Router()

//Utilizo mi variable router para definir el metodo a usar(get, post, put, patch, delete) y el path a utilizar, para despues ingresar el controlador que va a ejecutarse
router.post("/register", register)
router.post("/login", login)

export default router //exporto router para ser capaz de utilizar las rutas