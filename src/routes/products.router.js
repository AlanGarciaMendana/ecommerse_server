import express, { Router } from 'express' 
import  ProductManager  from "../dao/db/product--manager.js" 
import productoControler from '../controllers/product.controler.js'
const productControler = new productoControler()
const router = Router() 


router.get("/api/products",productControler.getProducts)
router.get("/api/products/:id", productControler.getProductsById) 
router.post("/", productControler.post) 
router.delete("/:id", productControler.delete)
router.put("/:id", productControler.put)
router.get("/%60/category/:category%60", productControler.getProductsByCategory);

export default router 