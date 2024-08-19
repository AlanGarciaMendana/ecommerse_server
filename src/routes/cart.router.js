import { Router } from "express" 
import { CartManager } from "../controllers/cart--manager.js" 
import CartsModel from "../models/carts.model.js" 

const router = Router() 
const manager = new CartManager()  

router.get ("/api/carts",async (req,res)=>{

    try {
        const arrayCarts = await CartsModel.find()
            res.json(arrayCarts)
        }
     catch (error) {
        res.json({ message: error.message })
    }
})


router.post("/api/carts", async (req, res) => {
    const newCart = req.body 
    try {
        await manager.addCart(newCart) 
        res.json({ status: "success", message: "Nuevo producto agregado con éxito" }) 
    } catch (error) {
        res.json({ status: "error", message: error.message }) 
    }
}) 

router.get("/api/carts/:id", async (req, res) => {
    let id = req.params.id 
    try {
        const carritoBuscado = await CartsModel.findById(id) 
        if (carritoBuscado) {
            res.send(carritoBuscado) 
        } else {
            res.send({ status: "error", message: error.message }) 
        }
    } catch (error) {
        res.send(error.message) 
    }
}) 

router.post ("/:cid/product/:pid",async (req,res)=>{
let cartId =req.params.cid
let productId = req.params.pid

try {
    await manager.addProductToCart(cartId,productId) 
    res.send({ status: "success", message: "Producto agregado al carrito con éxito" }) 
} catch (error) {
    res.send({ status: "error", message: error.message }) 
}
}) 

router.delete("/api/carts/:cid/products/:pid ",async(req,res)=>{
    let cartId = req.params.cid
    let productId = req.params.pid

    try { await manager.deleteProductFromCart(cartId,productId)
        res.json({ status: "success", message: "Producto eliminado del carrito con éxito" }) 
    } catch (error) {
        res.json({ status: "error", message: error.message }) 
    }
    }) 

router.delete("/api/carts/:cid", async(req,res)=>{
    try {
        let cartId = req.params.cid
        await manager.deleteAllProductsFromCart(cartId)
        res.json({ status: "success", message: "Productos eliminados del carrito con éxito" })
    } catch (error) {
        res.json({ status: "error", message: error.message })
    }
})
router.post("/api/carts/:cid/products/:pid",async (req,res)=>{
    const cartId = req.params.cid
    const productId = req.params.pid
    const quantity = req.body.quantity || 1

    try {
        const actCart = await manager.updateQuantityProductInCart(cartId, productId, quantity)
        res.status(200).json(actCart.products)
    } catch (error) {
        console.error("Error al agregar producto al carrito", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
})

export default router 


