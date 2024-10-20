
import CartsModel from "../dao/models/carts.model.js"
import CartRepository from "../repositories/cart.repository.js"
import CartManager from "../dao/db/cart--manager.js"

const cartRespository = new CartRepository()
const cartsManager = new CartManager()
class CartControler {

async find (req,res) {

    try {
        const arrayCarts = await CartsModel.find()
            res.json(arrayCarts)
        }
     catch (error) {
        res.json({ message: error.message })
    }
}


async productAdd (req, res) {
    const newCart = req.body 
    try {
        await cartRepository.addCart(newCart) 
        res.json({ status: "success", message: "Nuevo producto agregado con éxito" }) 
    } catch (error) {
        res.json({ status: "error", message: error.message }) 
    }
}

async getCartById (req, res) {
    let Id = req.params.cid
    try {
        const cartSearch = await CartsModel.findById(Id) 
        if (cartSearch) {
            res.send(cartSearch) 
        } else {
            res.send({ status: "error", message: error.message }) 
        }
    } catch (error) {
        res.send(error.message) 
    }
}

async postProductToCart (req,res) {
let cartId =req.params.cid
let productId = req.params.pid

try {
    await cartsManager.addProductToCart(cartId,productId) 
    res.send({ status: "success", message: "Producto agregado al carrito con éxito" }) 
} catch (error) {
    res.send({ status: "error", message: error.message }) 
}
}

async deleteProductFromCart (req,res) {
    let cartId = req.params.cid
    let productId = req.params.pid

    try { await cartsManager.deleteProductFromCart(cartId,productId)
        res.json({ status: "success", message: "Producto eliminado del carrito con éxito" }) 
    } catch (error) {
        res.json({ status: "error", message: error.message }) 
    }
    }

async deleteCart(req,res){
    try {
        let cartId = req.params.cid
        await cartsManager.deleteAllProductsFromCart(cartId)
        res.json({ status: "success", message: "Productos eliminados del carrito con éxito" })
    } catch (error) {
        res.json({ status: "error", message: error.message })
    }
}
async postQtyProductToCart(req,res){
    const cartId = req.params.cid
    const productId = req.params.pid
    const quantity = req.body.quantity || 1

    try {
        const actCart = await cartsManager.updateQuantityProductInCart(cartId, productId, quantity)
        res.status(200).json(actCart.products)
    } catch (error) {
        console.error("Error al agregar producto al carrito", error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
}
async updateCart(cartId, updatedCart) {
    try {
        // Busca el carrito por su ID y actualiza los datos
        const result = await CartsModel.findByIdAndUpdate(cartId, updatedCart, { new: true });

        if (!result) {
            throw new Error('Carrito no encontrado'); // Lanza un error si no se encuentra el carrito
        }

        return result; // Devuelve el carrito actualizado
    } catch (error) {
        throw new Error(error.message); // Lanza el error para manejarlo más arriba
    }
}
}

export default CartControler 


