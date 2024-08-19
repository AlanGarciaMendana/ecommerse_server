import express, { Router } from 'express' 
import { ProductManager } from "../controllers/product--manager.js" 
import ProductsModel from '../models/products.model.js' 

const router = Router() 



router.get("/api/products", async (req, res) => {
    try {
        let arrayProductos
        if (req.query.sort) {
            const sortDirection = req.query.sort === "asc" ? 1 : -1
            arrayProductos = await ProductsModel.aggregate([
                {
                    $sort: {
                        price: sortDirection 
                    }
                }
            ])
        } else {
            
            arrayProductos = await ProductsModel.find()
        }

        res.json(arrayProductos) 

    } catch (error) {
        res.json({ message: error.message })
    }
})

router.get("/api/products/:id", async (req, res) => {
    let id = req.params.id 
    try {
        const productoBuscado = await ProductsModel.findById(id) 
        if (productoBuscado) {
            res.json(productoBuscado) 
        } else {
            res.json({ status: "error", message: error.message }) 
        }
    } catch (error) {
        res.send(error.message) 
    }
}) 

router.post("/", async (req, res) => {
    const newProduct = req.body 
    try {
        const docProduct = new ProductsModel(newProduct) 
        await docProduct.save()
        res.send({ status: "success", message: "Nuevo producto agregado con éxito" }) 
    } catch (error) {
        res.send({ status: "error", message: error.message }) 
    }
}) 

router.delete("/:id", async (req,res)=>{
    let id=req.params.id
    try {
        const product = await ProductsModel.findByIdAndDelete(id)
        res.send({status:"success", message: "producto eliminado"})
        if (!product){
            return res.send({status:"Error",message:"cliente no encontrado"})
        }
    }
    catch(error){
        res.send({ status: "error", message: error.message }) 
    }
})

router.put("/:id", async (req,res)=>{

    try {
     const product=  await ProductsModel.findByIdAndUpdate(req.params.id, req.body)
        res.send({status:"success", message: "producto modificado con exito"})
        if (!product){
            return res.send({status:"Error",message:"cliente no encontrado"})
        }}
    catch(error){
        res.send({ status: "error", message: error.message }) 
    }
})

router.get("/%60/category/:category%60", async (req, res) => {
    const category = req.params.category;
    let page = req.query.page || 1;
    let limit = 5;

    try {
        const categories = await ProductsModel.distinct('category');
        const arrayProductos = await ProductsModel.paginate({ category }, { limit, page });
        const arrayProductosfinal = arrayProductos.docs.map(producto => {
            const { _id, ...rest } = producto.toObject();
            return { _id, ...rest };
        });

        res.render("category", {
            arrayProductos: arrayProductosfinal,
            hasPrevPage: arrayProductos.hasPrevPage,
            hasNextPage: arrayProductos.hasNextPage,
            prevPage: arrayProductos.prevPage,
            nextPage: arrayProductos.nextPage,
            currentPage: arrayProductos.page,
            totalPages: arrayProductos.totalPages,
            category,
            categories
        });
    } catch (error) {
        res.render({ message: error.message });
    }
});

export default router 