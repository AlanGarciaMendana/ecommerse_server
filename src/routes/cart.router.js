import { Router } from "express" 
import  CartManager  from "../dao/db/cart--manager.js" 
import CartsModel from "../dao/models/carts.model.js" 
import CartControler from "../controllers/cart.controler.js"
import TicketControler from '../controllers/ticket.controler.js';




const cartControler = new CartControler()
const ticketControler = new TicketControler();
const router = Router() 


router.get ("/api/carts", cartControler.find)
router.post("/api/carts",cartControler.productAdd ) 
router.get("/api/carts/:id",cartControler.getCartById ) 
router.post ("/:cid/product/:pid",cartControler.postProductToCart) 
router.delete("/api/carts/:cid/products/:pid",cartControler.deleteProductFromCart) 
router.delete("/api/carts/:cid",cartControler.deleteCart)
router.post("/api/carts/:cid/products/:pid",cartControler.postQtyProductToCart)
router.get('/:cid/purchase', ticketControler.purchaseCart)




export default router 


