import CartDao from "../dao/cart.dao.js";

const cartDao = new CartDao()

class CartRepository {
    async createCart(){
        return await cartDao.save({products: []})
    }

    async getCartById(id){
        return await cartDao.findById(id)
    }

    async updateCart(id, cartData) {
        return await cartDao.update(id, cartData)
    }

    async deleteCart(id) {
        return await cartDao.delete(id)
    }
}

export default CartRepository 