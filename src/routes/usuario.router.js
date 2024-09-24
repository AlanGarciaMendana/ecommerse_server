import { Router } from "express"
import usuarioModel from "../models/usuario.model.js"
import jwt from "jsonwebtoken"
import { createHash, isValidPassword } from "../utils/utils.js"
import passport from "passport"
import { CartManager } from "../controllers/cart--manager.js" 

const router = Router()


router.post("/register", async (req, res) => {
    const { firstName, lastName, age, password, email } = req.body

    try {
        const existeUsuario = await usuarioModel.findOne({ email })
        if (existeUsuario) {
            return res.status(400).send("El usuario ya existe")
        }

        const nuevoUsuario = new usuarioModel({
            firstName,
            lastName,
            email,
            age,
            password: createHash(password),
        })

        await nuevoUsuario.save()

   
        const cartManager = new CartManager()
        const newCart = await cartManager.addCart()


        nuevoUsuario.cart = newCart._id 
        await nuevoUsuario.save() 

        const token = jwt.sign({ usuario: nuevoUsuario.email }, "coderhouse", { expiresIn: "1h" })
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000,
            httpOnly: true
        })

        res.redirect("/api/sessions/current")
    } catch (error) {
        res.status(500).send("Error interno del servidor")
        console.log(error)
    }
})

router.post("/login",async (req,res)=>{
    const {email,password} = req.body

    try {
        const usuarioencontrado = await usuarioModel.findOne({email})
        if (!usuarioencontrado){
            return res.status(401).send("usuario no registrado")

        }

        if(!isValidPassword(password,usuarioencontrado)){

            return res.status(401).send("contraseña incorrecta")
        }

        const token = jwt.sign ({email:usuarioencontrado.email,rol:usuarioencontrado.rol,firstName:usuarioencontrado.firstName,lastName:usuarioencontrado.lastName},"coderhouse",{expiresIn:"1h"})

        res.cookie("coderCookieToken",token,{
            maxage:3600000,
            httpOnly:true
        })
        res.redirect("/api/sessions/current")


    } catch (error) {
        res.status(500).send("Error interno del servidor")
        
    }
})

router.post("/logout",(req,res)=>{

    res.clearCookie("coderCookieToken")
    res.redirect("/login")
})


router.get("/current",passport.authenticate("current",{session:false}),(req,res)=>{
res.render("home",{firstName:req.user.firstName, lastName:req.user.lastName})
})


export default router