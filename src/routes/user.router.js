import { Router } from "express"
import userModel from "../dao/models/user.model.js"
import jwt from "jsonwebtoken"
import { createHash, isValidPassword } from "../utils/utils.js"
import passport from "passport"
import { CartManager } from "../dao/db/cart--manager.js" 
import UserControler from "../controllers/user.controler.js"

const userControler = new UserControler()
const router = Router()

router.post("/register", userControler.register)
router.post("/login",userControler.login)
router.post("/logout",userControler.logout)
router.get("/current",passport.authenticate("current",{session:false}),userControler.current)


export default router