

import { promises as fs } from 'fs';

 export class ProductManager{
    static ultId= 0
    constructor(path){
        
        this.products =[]
        this.path= path
        
    
    }

    async addProduct({ title, description, code, price, stock, category }) {
        if (!title || !description || !code || !price || !stock || !category) {
            console.log("Por favor completar todos los campos");
            return;
        }

     
        const arrayProducts = await this.getProducts();

        if (arrayProducts.some(product => product.code === code)) {
            console.log("Código Repetido");
            return;
        }

        const maxId = arrayProducts.reduce((max, product) => product.id > max ? product.id : max, 0);
        const product = {
            id: maxId + 1,
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category
        };

        arrayProducts.push(product);
        await this.guardarArchivo(arrayProducts);
    }

    async getProducts(){
        const arrayProducts = await this.leerArchivo()
        return arrayProducts
    }

    async getProductsById(id){

        const arrayProducts = await this.leerArchivo()

        const productSearch = arrayProducts.find(product => product.id === id)
        if(!productSearch){
           return "producto no encontrado"
        }else{ return productSearch}
       
    }

    async leerArchivo(){
        const respuesta = await fs.readFile (this.path,"utf-8")
        const arrayProducts = JSON.parse(respuesta)
        return arrayProducts
    }

    async guardarArchivo(arrayProducts){
        await fs.writeFile(this.path, JSON.stringify(arrayProducts),null,2)
    }

    async removeProduct(id) {
        const arrayProducts = await this.leerArchivo()
        
        
        const filteredProducts = arrayProducts.filter(product => product.id !== id)
    
        if (filteredProducts.length === arrayProducts.length) {
           
            console.log("Producto no encontrado")
            return "Producto no encontrado"
        }
    
        await this.guardarArchivo(filteredProducts)
    
        return "Producto eliminado con éxito"}

        async updateProduct(id, updates) {
           
            if (!updates || typeof updates !== 'object') {
            
                return "Actualizaciones no válidas"
            }
        
            const arrayProducts = await this.leerArchivo()
  
            const index = arrayProducts.findIndex(product => product.id === id);
        
            if (index === -1) {
             
                return "Producto no encontrado";
            }
        
            const { id: idToIgnore, ...productUpdates } = updates;

            const updatedProduct = { ...arrayProducts[index], ...productUpdates };
            arrayProducts[index] = updatedProduct;
        
            await this.guardarArchivo(arrayProducts)
            return "Producto actualizado con éxito"
        }
}


    
