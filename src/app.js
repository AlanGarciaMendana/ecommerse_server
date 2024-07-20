import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';


const app = express();
const PUERTO = 8080

app.use(express.json())
app.use("/", productsRouter)
app.use("/",cartRouter)


app.listen(PUERTO,()=>{
    console.log(`Operando en el Puerto: ${PUERTO}`)
})