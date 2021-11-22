const productos = [
    {
        id: 1,
        name: "Jarron Oro Rosa",
        price: 12000,
        size: "Mediano",
        image: "./recursos/JarronOroRosa.png",
        ref: "0301",
        description: "Nuestro Jarrón oro rosa es el complemento ideal para tu decoración en tonos tierras, nudes, rosas, o como quieras combinarlo. Puedes llevarlo con las flores artificiales color rosa o decorarlo con flores naturales a tu elección. Te recomendamos el cuidado de este producto y transportarlo en su empaque.",
        type: "Jarrones"
    },
    {
        id: 2,
        name: "Candelabro 3 Niveles",
        price: 10000,
        size: "Mediano",
        image: "./recursos/CandelabroTresNiveles.png",
        ref: "0305",
        description: "Nuestro Jarrón oro rosa es el complemento ideal para tu decoración en tonos tierras, nudes, rosas, o como quieras combinarlo. Puedes llevarlo con las flores artificiales color rosa o decorarlo con flores naturales a tu elección. Te recomendamos el cuidado de este producto y transportarlo en su empaque.",
        type: "Candelabros"
    },
    {
        id: 3,
        name: "Jarron Espejos",
        price: 15000,
        size: "Mediano",
        image: "./recursos/JarronEspejos.png",
        ref: "0302",
        description: "Nuestro Jarrón oro rosa es el complemento ideal para tu decoración en tonos tierras, nudes, rosas, o como quieras combinarlo. Puedes llevarlo con las flores artificiales color rosa o decorarlo con flores naturales a tu elección. Te recomendamos el cuidado de este producto y transportarlo en su empaque.",
        type: "Jarrones"
    },
    {
        id: 4,
        name: "Mesa Vintage",
        price: 30000,
        size: "Grande",
        image: "./recursos/Vintage.png",
        ref: "0309",
        description: "Nuestro Jarrón oro rosa es el complemento ideal para tu decoración en tonos tierras, nudes, rosas, o como quieras combinarlo. Puedes llevarlo con las flores artificiales color rosa o decorarlo con flores naturales a tu elección. Te recomendamos el cuidado de este producto y transportarlo en su empaque.",
        type: "Mesas"
    }
    
];

const carrito = [];

const seccionDeProductos = document.getElementById("productos");

const pintarProducto = (item) => {
    const producto = document.createElement("a");
    producto.className = "producto";

    producto.setAttribute("href", `./producto.html?id=${item.id}`)
    
    const estaAgregado = carrito.some(productoBotonCarro => productoBotonCarro.id === item.id);
    
    let buttonHTML;
    if(estaAgregado){
        buttonHTML  = `<button class="producto__botonCarro" disabled></button>`;
    } else {
        buttonHTML = `<button class="producto__botonCarro"></button>`;
    }

    producto.innerHTML = `
    <img src="${item.image}" alt="" class="producto__imagen">
               
                <div class="producto__descripcion">
                    <h2 class="producto__titulo">${item.name}</h2>
                    <h3 class="producto__ref">Ref. ${item.ref}</h3>
    
                    <div class="producto__precioytam">
                        <div class="producto__precio">
                            <h2 class="producto__tituloitem">Precio Individual</h2>
                            <h3 class="producto__valor">$ ${item.price}</h3>
                        </div>
    
                        <div class="producto__tamanio">
                            <h2 class="producto__tituloitem">Tamaño</h2>
                            <h3 class="producto__valor">${item.size}</h3>
                        </div>
                                        
                    </div>
    
                    ${buttonHTML}
    
                </div>
    
    `;

    seccionDeProductos.appendChild(producto);
    const productoBotonCarro = producto.querySelector(".producto__botonCarro");

    productoBotonCarro.addEventListener("click", e => {
        e.preventDefault();
        const productoAgregado = {
            id: item.id,
            name: item.name,
            image: item.image
        };

        carrito.push(productoAgregado);
        productoBotonCarro.setAttribute("disabled", true);
    });

};

    const filtrarPorCategorias = document.getElementById("categorias");
    const ordenarPorElegido = document.getElementById("ordenarPor");

const cargarProductos = () => {

    const categoria = filtrarPorCategorias.value || "";
    const orden = ordenarPorElegido.value || "";

    seccionDeProductos.innerHTML = ""; 

    let productosYaFiltrados;

    if (categoria !== ""){
    productosYaFiltrados = productos.filter((producto) => producto.type === categoria);     
    } else {
        productosYaFiltrados = productos;
    }

    if(orden === "asc") {
        productosYaFiltrados = productosYaFiltrados.sort((a, b)=> a.price - b.price);
    }

    if(orden === "desc") {
        productosYaFiltrados = productosYaFiltrados.sort((a,b) => b.price - a.price);
    }



    productosYaFiltrados.forEach(producto => {
    pintarProducto(producto);
    });
};


ordenarPorElegido.addEventListener("change", e => {
    cargarProductos();
}); 

filtrarPorCategorias.addEventListener("change", e => {
    cargarProductos();    
}); 


    productos.forEach(producto => {
    pintarProducto(producto);
});