import { Router } from "express"
import  ProductManager  from "../dao/db/product--manager.js" 
import ProductsModel from "../dao/models/products.model.js" 
import  CartManager  from "../dao/db/cart--manager.js"
import jwt from "jsonwebtoken"
import {soloAdmin} from "../middlewares/auth.js"
import passport from "passport";


const router = Router()

const cartManager = new CartManager()

router.get("/", async (req, res) => {
  let page = parseInt(req.query.page) || 1
  let limit = parseInt(req.query.limit) || 5

  try {
      const categories = await ProductsModel.distinct('category')
      const arrayProducts = await ProductsModel.paginate({}, { limit, page })

      const arrayProductsfinal = arrayProducts.docs.map(product => {
          const { _id, ...rest } = product.toObject()
          return { _id, ...rest }
      })

      
      const token = req.cookies.coderCookieToken
      let user = null

      if (token) {
        
          try {
              user = jwt.verify(token, "coderhouse") 
          } catch (err) {
              console.error("Token inválido o expirado:", err)
          }
      }
     
      
      res.render("home", {
          arrayProducts: arrayProductsfinal,
          hasPrevPage: arrayProducts.hasPrevPage,
          hasNextPage: arrayProducts.hasNextPage,
          prevPage: arrayProducts.prevPage,
          nextPage: arrayProducts.nextPage,
          currentPage: arrayProducts.page,
          totalPages: arrayProducts.totalPages,
          categories,
          user
      })


  } catch (error) {
      console.error("Error al obtener los productos:", error)
      res.render("error", { message: "Error al cargar los productos." })
  }
})

router.get("/realtimeproducts",passport.authenticate("current", {session: false}),  soloAdmin, async (req,res)=>{
    await console.log("realtimeproducts")
    res.render("realtimeproducts")
})
router.get("/login", async (req,res)=>{
  await console.log("login")
  res.render("login")
})
router.get("/register", async (req,res)=>{
  await console.log("register")
  res.render("register")
})



router.get("/%60/product/:id%60", async (req, res) => {
  try {
    const productId = req.params.id
    const page = parseInt(req.query.page) || 1
    const limit = 3 


    const product = await ProductsModel.findById(productId).lean()

    if (!product) {
        return res.status(404).render("error", { message: "Producto no encontrado" })
    }


    const productsRelated = await ProductsModel.paginate({
      category: product.category, 
      _id: { $ne: productId } 
  },{
      page,
      limit,
  })


  const productsRelatedFinal = productsRelated.docs.map(product => {
      const { _id, ...rest } = product.toObject()
      return { _id, ...rest }
  })


  res.render("product", {
      product,
      productsRelated: productsRelatedFinal,
      hasPrevPage: productsRelatedFinal.hasPrevPage,
      hasNextPage: productsRelatedFinal.hasNextPage,
      prevPage: productsRelatedFinal.prevPage,
      nextPage: productsRelatedFinal.nextPage,
      currentPage: productsRelatedFinal.page,
      totalPages: productsRelatedFinal.totalPages
  
    })
    } catch (error) {
        res.status(500).render("error", { message: error.message }) 
    }
})

router.get('/carts/:cid', async (req, res) => {
    const cartId = req.params.cid
  
    try {
      const cart = await cartManager.getCartsById(cartId)
  
      if (!cart) {
        console.log('No existe ese carrito con el id')
        return res.status(404).json({ error: 'Carrito no encontrado' })
      } 
      const productsInCart = await Promise.all(
        cart.products.map(async (item) => {
          const product = await ProductsModel.findById(item.product) 
          return {
            product: product ? product.toObject() : null,
            quantity: item.quantity
          }
        })
      )
  
      res.render('cart', { products: productsInCart })
    } catch (error) {
      console.error('Error al obtener el carrito', error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  })
export default router