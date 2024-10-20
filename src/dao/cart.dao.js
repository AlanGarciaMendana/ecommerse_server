
import CartsModel from "./models/carts.model.js"

class CartDao {
    async findById(id){
        return await CartsModel.findById(id).populate('products.product', '_id title price') 
    }

    async save(cartData){
        const cart = new CartsModel(cartData)
        return await cart.save()
    }

    async update(id, cartData){
        return await CartsModel.findByIdAndUpdate(id, cartData) 
    }

    async delete(id) {
        return await CartsModel.findByIdAndDelete(id) 
    }
}

export default CartDao 