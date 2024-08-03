import express, { Router } from 'express';
import { ProductManager } from "../controllers/product--manager.js";

const router = Router();
const manager = new ProductManager('./src/data/products.json'); 


router.get("/api/products", async (req, res) => {
    let limit = req.query.limit;
    try {
        const arrayProductos = await manager.getProducts();

        if (limit) {
            res.send(arrayProductos.slice(0, parseInt(limit)));
        } else {
            res.send(arrayProductos);
        }
    } catch (error) {
        res.send({ message: error.message });
    }
    
});

router.get("/api/products/:id", async (req, res) => {
    let id = req.params.id;
    try {
        const productoBuscado = await manager.getProductsById(parseInt(id));
        if (productoBuscado) {
            res.send(productoBuscado);
        } else {
            res.send({ status: "error", message: error.message });
        }
    } catch (error) {
        res.send(error.message);
    }
});

router.post("/", async (req, res) => {
    const newProduct = req.body;
    try {
        await manager.addProduct(newProduct);
        res.send({ status: "success", message: "Nuevo producto agregado con éxito" });
    } catch (error) {
        res.send({ status: "error", message: error.message });
    }
});

router.delete("/:id", async (req,res)=>{
    let id=req.params.id
    try {
        await manager.removeProduct(parseInt(id))
        res.send({status:"success", message: "producto eliminado"})
    }
    catch(error){
        res.send({ status: "error", message: error.message });
    }
})

router.put("/:id", async (req,res)=>{
    let id=req.params.id
    const updates = req.body
    try {
        await manager.updateProduct(parseInt(id),updates)
        res.send({status:"success", message: "producto modificado con exito"})
    }
    catch(error){
        res.send({ status: "error", message: error.message });
    }
})

export default router;