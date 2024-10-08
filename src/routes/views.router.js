import { Router } from "express"
import { ProductManager } from "../controllers/product--manager.js" 
import ProductsModel from "../models/products.model.js" 
import { CartManager } from "../controllers/cart--manager.js"

const router = Router()

const cartManager = new CartManager()

router.get("/", async (req,res)=>{
    let page = req.query.page || 1
    let limit = 5
    try {
        const categories = await ProductsModel.distinct('category');
        const arrayProductos = await ProductsModel.paginate({},{limit,page})
        const arrayProductosfinal = arrayProductos.docs.map(producto=>{
            const {_id,...rest} = producto.toObject()
            return {_id,...rest}
           
        })
            res.render("home",{
                arrayProductos: arrayProductosfinal,
                hasPrevPage: arrayProductos.hasPrevPage,
                hasNextPage: arrayProductos.hasNextPage,
                prevPage: arrayProductos.prevPage,
                nextPage: arrayProductos.nextPage,
                currentPage: arrayProductos.page,
                totalPages:arrayProductos.totalPages,
                categories,
                 

            }) 
        
    } catch (error) {
        res.render({ message: error.message }) 
    }
    

})

router.get("/realtimeproducts", async (req,res)=>{
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


    const producto = await ProductsModel.findById(productId).lean()

    if (!producto) {
        return res.status(404).render("error", { message: "Producto no encontrado" })
    }


    const productosRelacionados = await ProductsModel.paginate({
      category: producto.category, 
      _id: { $ne: productId } 
  },{
      page,
      limit,
  })


  const productosRelacionadosFinal = productosRelacionados.docs.map(producto => {
      const { _id, ...rest } = producto.toObject();
      return { _id, ...rest };
  });

  // Renderiza la vista del producto con los productos relacionados
  res.render("product", {
      producto,
      productosRelacionados: productosRelacionadosFinal,
      hasPrevPage: productosRelacionados.hasPrevPage,
      hasNextPage: productosRelacionados.hasNextPage,
      prevPage: productosRelacionados.prevPage,
      nextPage: productosRelacionados.nextPage,
      currentPage: productosRelacionados.page,
      totalPages: productosRelacionados.totalPages
  
    });
    } catch (error) {
        res.status(500).render("error", { message: error.message }) 
    }
})

router.get('/carts/:cid', async (req, res) => {
    const cartId = req.params.cid
  
    try {
      const carrito = await cartManager.getCartsById(cartId)
  
      if (!carrito) {
        console.log('No existe ese carrito con el id')
        return res.status(404).json({ error: 'Carrito no encontrado' })
      } 
      const productosEnCarrito = await Promise.all(
        carrito.products.map(async (item) => {
          const product = await ProductsModel.findById(item.product) 
          return {
            product: product ? product.toObject() : null,
            quantity: item.quantity
          }
        })
      )
  
      res.render('cart', { productos: productosEnCarrito })
    } catch (error) {
      console.error('Error al obtener el carrito', error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  })
export default router