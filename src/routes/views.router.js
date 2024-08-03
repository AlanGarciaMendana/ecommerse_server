import { Router } from "express"
import { ProductManager } from "../controllers/product--manager.js";

const manager = new ProductManager('./src/data/products.json'); 
const router = Router()

router.get("/", async (req,res)=>{
    let limit = req.query.limit;
    try {
        const arrayProductos = await manager.getProducts();

        if (limit) {
            res.render("home",arrayProductos.slice(0, parseInt(limit)));
        } else {
            res.render("home",{arrayProductos});
        }
    } catch (error) {
        res.render({ message: error.message });
    }
    

})

router.get("/realtimeproducts", async (req,res)=>{
    await console.log("realtimeproducts")
    res.render("realtimeproducts")
})

export default router