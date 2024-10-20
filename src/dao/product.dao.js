import ProductsModel from "./models/product.model.js"

class ProductDao {
    async findById(id) {
        return await ProductsModel.findById(id)
    }

    async find(query) {
        return await ProductsModel.find(query) 
    }

    async save(productData) {
        const product = new ProductsModel(productData) 
        return await product.save() 
    }

    async update(id, productData) {
        return await ProductsModel.findByIdAndUpdate(id, productData) 
    }

    async delete(id) {
        return await ProductsModel.findByIdAndDelete(id) 
    }

}

export default ProductDao 