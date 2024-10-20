import UserService from "../services/user.service.js"
import CartRepository from "../repositories/cart.repository.js"
import UserDTO from "../dto/user.dto.js"
import UserDao from "../dao/user.dao.js"
import jwt from "jsonwebtoken"



const userDao = new UserDao()
const cartRepository = new CartRepository()
const userService = new UserService()



    class UserControler {
        async register(req, res) {
            const { firstName, lastName, age, password, email } = req.body
    
            try {
         
                const newUser = await userService.registerUser({
                    firstName,
                    lastName,
                    email,
                    age,
                    password,
                })
    
                
                if (!newUser) {
                    return res.status(400).send("Error al crear el usuario.")
                }
    
                const newCart = await cartRepository.createCart()
                newUser.cart = newCart._id 
                await userDao.save(newUser)
    
          
    
                const token = jwt.sign({  user: `${newUser.firstName} ${newUser.lastName}`,
                    email: newUser.email,
                    rol: newUser.rol,
                cart: newUser.cart }, "coderhouse", { expiresIn: "1h" })
    
             
                res.cookie("coderCookieToken", token, {
                    maxAge: 3600000,
                    httpOnly: true
                })
    
             
                res.redirect("/")
            } catch (error) {
                res.status(500).send("Error interno del servidor")
                console.log(error)
            }
        }
    
        async login(req, res) {
            const { email, password } = req.body
    
            try {
                const user = await userService.loginUser(email, password)    
                
       
                if (!user) {
                    return res.status(401).send("Credenciales incorrectas.")
                }
    
        
              
                
        
                const token = jwt.sign({  user: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    rol: user.rol,
                cart: user.cart }, "coderhouse", { expiresIn: "1h" })
    
            
                res.cookie("coderCookieToken", token, {
                    maxAge: 3600000,
                    httpOnly: true
                })
    
           
                res.redirect("/")
            } catch (error) {
                res.status(500).send("Error interno del servidor")
                console.log(error)
            }
        }
    
        async current(req, res) {
            if (req.user) {
                const user = req.user
                const userDTO = new UserDTO(user)
                console.log(user)
                res.render("home", { user: userDTO }) 
            } else {
                res.redirect("/login") 
            }
        }
    
        async logout(req, res) {
            res.clearCookie("coderCookieToken")
            res.redirect("/login")
        }
    }
    
    export default UserControler