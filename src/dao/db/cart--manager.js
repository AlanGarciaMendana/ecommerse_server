import CartsModel from "../models/carts.model.js" 
import ProductsModel from "../models/products.model.js" 

 class CartManager{

        async addCart() {        
try {
    const newCart = new CartsModel({products:[]}) 
    await newCart.save()
    return newCart

}
 catch (error) {
    console.log(error)
 }
}
    
          
        async getCartsById(id){
    
            const findCart = await CartsModel.findById(id)
    
            if(!findCart){
               return console.log("No existe el carrito")
            }else{ return findCart}
           
        }
        async getCarts(){
            const arrayProducts = await CartsModel.find()
            return arrayProducts
        }

       
        async addProductToCart(cartId, productId) {
            try {
                const cart = await CartsModel.findById(cartId) 
                if (!cart) {
                    return "Carrito no encontrado" 
                }
        
                const product = await ProductsModel.findById(productId) 
                if (!product) {
                    return "Producto no encontrado" 
                }
        
                const productIndex = cart.products.findIndex(item => item.product.toString() === productId) 
        
                if (productIndex > -1) {
                    cart.products[productIndex].quantity += 1 
                } else {
                    cart.products.push({ product: productId, quantity: 1 }) 
                }

                await cart.save() 
                return "Producto agregado al carrito" 
            } catch (error) {
                console.log(error) 
                return "Error al agregar el producto al carrito" 
            }
        }

      
        async deleteAllProductsFromCart(cartId) {
            try {
                const searchCart = await CartsModel.findById(cartId) 
        
                if (!searchCart) {
                    console.log(`Carrito con ID ${cartId} no encontrado`) 
                    return 
                }

                searchCart.products = [] 

                await searchCart.save() 
        
                console.log("Todos los productos han sido eliminados del carrito") 
            } catch (error) {
                console.log(error) 
            }
        }
        async updateQuantityProductInCart(cartId, productId, quantity) {
            try {
                const cart = await this.getCartsById(cartId)
                const product = cart.products.find(item => item.product.toString() === productId)
        
                if (product) {
                    product.quantity = quantity
                    cart.markModified("products")
                    await cart.save()
                } else {
                    throw new Error(`No se encontró el producto con el id ${productId} en el carrito`)
                }
        
                return cart
        
            } catch (error) {
                console.error("Error al actualizar la cantidad del producto en el carrito", error)
                throw error
            }
        }
        
        async deleteProductFromCart(cartId, productId) {
            try {
                const searchCart = await CartsModel.findById(cartId)
        
                if (!searchCart) {
                    console.log(`Carrito con ID ${cartId} no encontrado`)
                    return
                }
        
                const productIndex = searchCart.products.findIndex(product => product.product.toString() === productId)
        
                if (productIndex > -1) {
                    searchCart.products = searchCart.products.filter(p => p.product.toString() !== productId)
                    searchCart.markModified("products")
                    await searchCart.save()
                    console.log(`Producto con ID ${productId} eliminado del carrito ${cartId}`)
                } else {
                    console.log(`Producto con ID ${productId} no encontrado en el carrito ${cartId}`)
                }
        
            } catch (error) {
                console.log(error)
            }
        }
}

export default CartManager