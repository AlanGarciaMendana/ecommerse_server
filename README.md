
# Server Ecommerse

Servidor de Ecommerse creado en la clase : #70080-programación-backend-desarrollo-avanzado-de-backend


## 1er Entrega modulo I

- Se realizo El servidor por EXPRESS 
- Se crea las rutas para:
CREAR
ELIMINAR
MODIFICAR
MOSTRAR
Los productos de el archivo PRODUCTS.JSON y los carritos de CARTS.JSON
## 2da Entrega modulo I

- Se realiza la comunicacion con el cliente y servidor a traves de Socket.IO

- Se crea el vinculo con Express-Handlebars

- Se crea la ruta "/" donde se visualiza la lista de productos por medio de Express - handlebars

- Se crea la ruta "/realtimeproducts" donde se visualiza un boton para agregar productos el cual muestra un formulario que envia a la APP el detalle del nuevo producto y visualiza en tiempo real la lista de productos con un boton para eliminar cada uno

## Entrega Final modulo I

- Se creo la conexion con Mongoose.
- En la ruta Home se agrego una paginacion de todos los productos.
- Se crearon las vistas de cada producto con una lista de productos relacionados (en construccion).
- Se creo una vista de Categorias con un filtro por categoria.
- En la ruta /api/products se visualizan los productos y se pueden ordenar por precio asc y des.
- Se creo la ruta /api/carts/:cid que se visualiza en formato Json el carrito con el id enviado.
- En la ruta /carts/:cid se visualiza el carrito con el ID enviado.
- En los carts al agregar un producto se agrega el objeto completo.
- Se crearon las nuevas rutas para Carts que añaden cantidad de productos enviados por body, elimina todos los productos y se elimina el producto enviado.
- En la vision RealTimeProducts se agrego un boton para subir las fotos de los productos(en construccion).

  ## 1era Entrega modulo II

  -Se creo la base de datos de los usuarios la cual al crear un nuevo usuario se le asigna una carrito nuevo.
  -Se creo el JWT para autenticar los diferentes usuarios.
  -Se creo el passport para poner diferenciar las sesiones.
  -Se crearon las vistas de login / register.
  -Se creo la ruta api/session/current donde al ingresar se saluda al usuario y se agrega un boton de logout que borra el token. (faltan corregir los estilos en /home)



