import { Router } from "express" 
import { CartManager } from "../dao/db/cart--manager.js" 
import CartsModel from "../dao/models/carts.model.js" 
import CartController from "../controllers/cart.controler.js"

const cartController = new CartController()
const router = Router() 


router.get ("/api/carts", cartController.find)
router.post("/api/carts",cartController.productAdd ) 
router.get("/api/carts/:id",cartController.getCartById ) 
router.post ("/:cid/product/:pid",cartController.postProductToCart) 
router.delete("/api/carts/:cid/products/:pid",cartController.deleteProductFromCart) 
router.delete("/api/carts/:cid",cartController.deleteCart)
router.post("/api/carts/:cid/products/:pid",cartController.postQtyProductToCart)




export default router 


