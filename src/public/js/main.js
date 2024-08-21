
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

    const renderProducts = (products) => {
        const contenedorProductos = document.getElementById("cardproduct_container");
        contenedorProductos.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Categoria</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.map(item => `
                        <tr data-id="${item._id}">
                            <td>${item._id}</td>
                            <td>${item.title}</td>
                            <td>${item.description}</td>
                            <td>${item.category}</td>
                            <td>$${item.price}</td>
                            <td>${item.stock}</td>
                            <td>
                                <button classname="icon-button" style="background-color:gray;width:fit-content;margin:auto">
                                    <img src="https://img.icons8.com/?size=14&id=53386&format=png&color=FFFFFF" alt="Ícono de ejemplo" class="icon-image">
                                </button>
                                <button class="delete-button">Eliminar</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    

        products.forEach(item => {
            const deleteButton = contenedorProductos.querySelector(`tr[data-id="${item._id}"] .delete-button`);
            deleteButton.addEventListener("click", () => {
                eliminarProducto(item._id);
                console.log(item._id)
            });
        });
    };
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
  
    document.addEventListener('DOMContentLoaded', function () {
        const items = document.querySelectorAll('.carousel-item');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentIndex = 0;
    
        function updateCarousel() {
            if (items.length === 0) return; // Si no hay elementos, no hacer nada
            items.forEach((item, index) => {
                item.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
            });
        }
    
        prevBtn.addEventListener('click', function () {
            currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
            updateCarousel();
        });
    
        nextBtn.addEventListener('click', function () {
            currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        });
    
        updateCarousel(); // Inicializa la posición del carrusel
    });

