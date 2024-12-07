import express from 'express' 
import viewsRouter from "./routes/views.router.js"
import exphbs from "express-handlebars"
import { Server } from 'socket.io' 
import  ProductManager  from "./dao/db/product--manager.js" 
import mongoose from 'mongoose' 
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/cart.router.js"
import ProductsModel from './dao/models/products.model.js'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import userRouter from "./routes/user.router.js" 
import initializePassport from './config/passport.config.js'
import addLogger from "./utils/logger.js"
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from "swagger-ui-express"


const manager = new ProductManager()

const app = express() 
const PUERTO = 8080


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Mercader Api',
            description: 'Documentación del mercader de venecia',
        },
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
};
const specs = swaggerJSDoc(swaggerOptions)

app.engine("handlebars",exphbs.engine())
app.set("view engine","handlebars")
app.set("views","./src/views")


app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())
app.use(addLogger)



app.use("/", productsRouter)
app.use("/", viewsRouter)
app.use("/",cartsRouter)
app.use("/", userRouter)
app.use("/api/sessions", userRouter)


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


  