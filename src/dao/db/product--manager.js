import ProductsModel from "../models/products.model.js"


 export class ProductManager{
   

    async addProduct({ title, description, code, price, stock, category }) {
        if (!title || !description || !code || !price || !stock || !category) {
            console.log("Por favor completar todos los campos")
            return
            
        }
        const validateProduct = await ProductsModel.findOne({code:code})
        if (validateProduct) {
            console.log("Ya existe el codigo" )
            return
        }
    


        const product = new ProductsModel( {
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category
        })

        await product.save()
    
    }

    async getProducts(){
        const arrayProducts = ProductModel.find()
        return arrayProducts
    }

    async getProductsById(id){

        const productSearch = await ProductsModel.findById(id)

      
        if(!productSearch){
            console.log("producto no encontrado")
           return 
        }else{ return productSearch}
       
    }

    

    async removeProduct(id) {

        try {
            const deleted = await ProductsModel.findByIdAndDelete(id)
            if (!deleted){
                 console.log("No existe el producto")
                    
                }
                return deleted
            }
     catch (error) {
            console.log(error)
            
        }
        
    }
       

        async updateProduct(id, updates) {
           
         try {
            const update = await ProductsModel.findByIdAndUpdate(id,updates)
            if(!update){
                console.log("No se encuentra el producto")
                return
            }
            return update
         } catch (error) {
            console.log(error)
            
         }
        }
}


    
