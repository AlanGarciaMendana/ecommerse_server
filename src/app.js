import express from 'express' 
import viewsRouter from "./routes/views.router.js"
import exphbs from "express-handlebars"
import { Server } from 'socket.io' 
import { ProductManager } from "./controllers/product--manager.js" 
import mongoose from 'mongoose' 
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/cart.router.js"
import ProductsModel from './models/products.model.js'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import usuarioRouter from "./routes/usuario.router.js" 
import initializePassport from './config/passport.config.js'


const manager = new ProductManager()  

const app = express() 
const PUERTO = 8080



app.engine("handlebars",exphbs.engine())
app.set("view engine","handlebars")
app.set("views","./src/views")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())



app.use("/", productsRouter)
app.use("/", viewsRouter)
app.use("/",cartsRouter)
app.use("/", usuarioRouter)
app.use("/api/sessions", usuarioRouter)


app.use(express.static ("./src/public"))

mongoose.connect("mongodb+srv://alitan31:alangm123@cluster0.mnv3c.mongodb.net/Supermercado?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{console.log("Conectado al servidor de mongo")})
.catch(()=>{console.log("Error al ingresar al servidor")})


const httpServer = app.listen(PUERTO,()=>{
    console.log(`Operando en el Puerto: ${PUERTO}`)
})

const io =new Server(httpServer)

io.on("connection", async (socket)=>{
    console.log("cliente conectado")

    socket.emit("products", await ProductsModel.find()
    )
    socket.on("deleteproduct", async (_id)=>{
        await ProductsModel.findByIdAndDelete(_id)
    io.sockets.emit("products",await ProductsModel.find())})
    
        socket.on("addProduct", async (productData) => {
            await manager.addProduct(productData)
            io.sockets.emit("products",await ProductsModel.find())})  
    
    })


  