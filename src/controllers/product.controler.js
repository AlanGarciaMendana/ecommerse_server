import ProductsModel from "../dao/models/products.model.js"

const productsModel = new ProductsModel()

class productoControler {

    async getProducts (req,res){
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
    }

    async getProductsById (req,res){
        let id = req.params.id 
        try {
            const productSearch = await productsModel.findById(id) 
            if (productSearch) {
                res.json(productSearch) 
            } else {
                res.json({ status: "error", message: error.message }) 
            }
        } catch (error) {
            res.send(error.message) 
        }
    }

    async post (req,res){
        const newProduct = req.body 
        try {
            const docProduct = new productsModel(newProduct) 
            await docProduct.save()
            res.send({ status: "success", message: "Nuevo producto agregado con éxito" }) 
        } catch (error) {
            res.send({ status: "error", message: error.message }) 
        }
    }

    async delete (req,res){
        let id=req.params.id
        try {
            const product = await productsModel.findByIdAndDelete(id)
            res.send({status:"success", message: "producto eliminado"})
            if (!product){
                return res.send({status:"Error",message:"cliente no encontrado"})
            }
        }
        catch(error){
            res.send({ status: "error", message: error.message }) 
        }
    }

    async put (req,res){
        try {
            const product=  await ProductsModel.findByIdAndUpdate(req.params.id, req.body)
               res.send({status:"success", message: "producto modificado con exito"})
               if (!product){
                   return res.send({status:"Error",message:"cliente no encontrado"})
               }}
           catch(error){
               res.send({ status: "error", message: error.message }) 
           }
    }

    async getProductsByCategory (req,res){
        const category = req.params.category
        let page = req.query.page || 1
        let limit = 5
    
        try {
            const categories = await ProductsModel.distinct('category')
            const arrayProducts = await ProductsModel.paginate({ category }, { limit, page })
            const arrayProductsfinal = arrayProducts.docs.map(product => {
                const { _id, ...rest } = product.toObject()
                return { _id, ...rest }
            })
    
            res.render("category", {
                arrayProducts: arrayProductsfinal,
                hasPrevPage: arrayProducts.hasPrevPage,
                hasNextPage: arrayProducts.hasNextPage,
                prevPage: arrayProducts.prevPage,
                nextPage: arrayProducts.nextPage,
                currentPage: arrayProducts.page,
                totalPages: arrayProducts.totalPages,
                category,
                categories
            })
        } catch (error) {
            res.render({ message: error.message })
        }

    }
}
export default productoControler