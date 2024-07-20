import { Router } from "express";
import { CartManager } from "../controllers/cart--manager.js";

const router = Router();
const manager = new CartManager('./src/data/carts.json'); 

router.get ("/api/carts",async (req,res)=>{

    let limit = req.query.limit;
    try {
        const arrayCarts = await manager.getCarts();

        if (limit) {
            res.send(arrayCarts.slice(0, parseInt(limit)));
        } else {
            res.send(arrayCarts);
        }
    } catch (error) {
        res.send({ message: error.message });
    }
});


router.post("/api/carts", async (req, res) => {
    const newCart = req.body;
    try {
        await manager.addCart(newCart);
        res.send({ status: "success", message: "Nuevo producto agregado con éxito" });
    } catch (error) {
        res.send({ status: "error", message: error.message });
    }
});

router.get("/api/carts/:id", async (req, res) => {
    let id = req.params.id;
    try {
        const carritoBuscado = await manager.getCartsById(parseInt(id));
        if (carritoBuscado) {
            res.send(carritoBuscado);
        } else {
            res.send({ status: "error", message: error.message });
        }
    } catch (error) {
        res.send(error.message);
    }
});

router.post ("/:cid/product/:pid",async (req,res)=>{
let cartId =req.params.cid
let productId = req.params.pid

try {
    await manager.addProductToCart(parseInt(cartId),parseInt(productId));
    res.send({ status: "success", message: "Producto agregado al carrito con éxito" });
} catch (error) {
    res.send({ status: "error", message: error.message });
}
});

export default router;


