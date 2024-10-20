import userModel from '../dao/models/user.model.js'
import TicketDao from '../dao/ticket.dao.js'
import CartControler from './cart.controler.js'
import ProductControler from './product.controler.js'
import CartsModel from '../dao/models/carts.model.js'
import ProductsModel from '../dao/models/products.model.js'

const productControler = new ProductControler()
const cartControler = new CartControler()
const ticketDao = new TicketDao()

      class TicketControler{
    

        async purchaseCart(req, res) {
            const cartId = req.params.cid
        
            try {

                const cart = await await CartsModel.findById(cartId) 
                const products = cart.products
                if (!cart) {
                    return res.status(404).json({ error: 'Carrito no encontrado' })
                }
        
                const productsOutOfStock = []
                let totalAmount = 0
        
                for (const item of products) {
                    const product = await ProductsModel.findById(item.product)
        
                    if (product && product.stock >= item.quantity) {
                        product.stock -= item.quantity 
                        await ProductsModel.findByIdAndUpdate(product._id, { stock: product.stock }) 
                        totalAmount += product.price * item.quantity 
                    } else {
                        productsOutOfStock.push(item.product) 
                    }
                }
        
                
                if (totalAmount > 0) {
                    
                    cart.products = cart.products.filter(item => !productsOutOfStock.includes(item.product))
                await cartControler.updateCart(cartId, cart) 
                const userWithCart = await userModel.findOne({cart:cartId})
              
                const ticketData = {
                    code: generateTicketCode(),
                    amount: totalAmount,
                    purchaser: userWithCart
                }
                await ticketDao.create(ticketData)
                res.json({
                    message: 'Compra finalizada',
                })
                }
            
          
               
            } catch (error) {
                console.error("Error durante el proceso de compra:", error)
                res.status(500).json({ error: 'Error en el proceso de compra. Inténtalo nuevamente.' })
            }
        }}

        function generateTicketCode() {
            return 'TCK-' + Date.now()}
export default TicketControler