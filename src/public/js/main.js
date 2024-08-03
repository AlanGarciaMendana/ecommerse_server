const socket = io()


document.getElementById("showFormBtn").addEventListener("click", function() {
    document.getElementById("formContainer").style.display = "block";
    this.style.display = "none";
})
document.getElementById("cancel_form").addEventListener("click", function() {
    document.getElementById("formContainer").style.display = "none";
    document.getElementById("showFormBtn").style.display="block"})

    socket.on("products",async (data)=>{ 
       await renderProducts(data)

    })

     const renderProducts= (products)=>{
        const contenedorProductos= document.getElementById ("cardproduct_container")
        contenedorProductos.innerHTML=""
        products.forEach(item =>{
            const card= document.createElement("div")
            card.classList.add("product_card")
            card.innerHTML = 
            `<h2>${item.title}</h2>
            <p>ID: ${item.id}</p>
        <p>${item.description}</p>
        <p>Precio: ${item.price}</p>
        <p>Stock: ${item.stock}</p>
        <button>Eliminar Producto</button>
       `
       contenedorProductos.appendChild(card)
       card.querySelector("button").addEventListener("click",()=>{
        eliminarProducto(item.id)
       })
        })
    }
    const eliminarProducto =(id)=>{
socket.emit("deleteproduct",id)
    }

    document.getElementById("productForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const productData = {
            title: formData.get("title"),
            description: formData.get("description"),
            code: formData.get("code"),
            price: formData.get("price"),
            stock: formData.get("stock"),
            category: formData.get("category")
        };
        

        socket.emit("addProduct", productData)
        document.getElementById("productForm").reset()
        document.getElementById("formContainer").style.display = "none"
        document.getElementById("showFormBtn").style.display="block"

    });