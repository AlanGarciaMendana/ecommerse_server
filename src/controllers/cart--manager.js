import { promises as fs } from 'fs';

export class CartManager{

    static ultId=0

    constructor(path){
        
        this.carts =[]
        this.path= path}


        async addCart() {        

            const arrayCarts = await this.getCarts();
    
            const maxId = arrayCarts.reduce((max, product) => product.id > max ? product.id : max, 0);
            const cart = {
                id: maxId + 1,
              products:[]
            };
    
            arrayCarts.push(cart);
            await this.guardarArchivo(arrayCarts);
        }
    
          
        async getCartsById(id){
    
            const arrayCarts = await this.leerArchivo()
    
            const cartSearch = arrayCarts.find(cart => cart.id === id)
            if(!cartSearch){
               return "No existe el carrito"
            }else{ return cartSearch}
           
        }
        async getCarts(){
            const arrayProducts = await this.leerArchivo()
            return arrayProducts
        }

        async leerArchivo(){
            const respuesta = await fs.readFile (this.path,"utf-8")
            const arrayCarts = JSON.parse(respuesta)
            return arrayCarts
        }
    
        async guardarArchivo(arrayCarts){
            await fs.writeFile(this.path, JSON.stringify(arrayCarts),null,2)
        }
       
        async addProductToCart(cartId, productId) {
            const arrayCarts = await this.leerArchivo()
            const cart = arrayCarts.find(cart => cart.id === cartId);
            if (!cart) {
                return "Carrito no encontrado"
            }
    
            const productIndex = cart.products.findIndex(item => item.productId === productId)
    
            if (productIndex !== -1) {
     
                cart.products[productIndex].qty += 1
            } else {

                cart.products.push({ productId, qty: 1 })
            }
    
            await this.guardarArchivo(arrayCarts)

            return "Producto añadido al carrito con éxito"
        }

}