import express from 'express';
import viewsRouter from "./routes/views.router.js"
import exphbs from "express-handlebars"
import { Server } from 'socket.io';
import { ProductManager } from "./controllers/product--manager.js";

const manager = new ProductManager("./src/data/products.json"); 

const app = express();
const PUERTO = 8080

app.use(express.static ("./src/public"))

app.engine("handlebars",exphbs.engine())
app.set("view engine","handlebars")
app.set("views","./src/views")

app.use(express.json())
app.use("/", viewsRouter)



const httpServer = app.listen(PUERTO,()=>{
    console.log(`Operando en el Puerto: ${PUERTO}`)
})

const io =new Server(httpServer)

io.on("connection", async (socket)=>{
    console.log("cliente conectado")

    socket.emit("products", await manager.getProducts()
    )
    socket.on("deleteproduct", async (id)=>{
        await manager.removeProduct(id)
    io.sockets.emit("products",await manager.getProducts())})
    
        socket.on("addProduct", async (productData) => {
            await manager.addProduct(productData)
            io.sockets.emit("products",await manager.getProducts())})  
    
    })
