const productos = [
    {
        id: 1,
        name: "Jarron Oro Rosa",
        price: "15.000",
        size: "Mediano",
        image: "./recursos/JarronOroRosa.png",
        ref: "0301",
        description: "Nuestro Jarrón oro rosa es el complemento ideal para tu decoración en tonos tierras, nudes, rosas, o como quieras combinarlo. Puedes llevarlo con las flores artificiales color rosa o decorarlo con flores naturales a tu elección. Te recomendamos el cuidado de este producto y transportarlo en su empaque.",
        type: "jarrones"
    },
    {
        id: 2,
        name: "Candelabro 3 Niveles",
        price: "15.000",
        size: "Mediano",
        image: "./recursos/CandelabroTresNiveles.png",
        ref: "0305",
        description: "Nuestro Jarrón oro rosa es el complemento ideal para tu decoración en tonos tierras, nudes, rosas, o como quieras combinarlo. Puedes llevarlo con las flores artificiales color rosa o decorarlo con flores naturales a tu elección. Te recomendamos el cuidado de este producto y transportarlo en su empaque.",
        type: "candelabros"
    },
    {
        id: 3,
        name: "Jarron Espejos",
        price: "15.000",
        size: "Mediano",
        image: "./recursos/JarronEspejos.png",
        ref: "0302",
        description: "Nuestro Jarrón oro rosa es el complemento ideal para tu decoración en tonos tierras, nudes, rosas, o como quieras combinarlo. Puedes llevarlo con las flores artificiales color rosa o decorarlo con flores naturales a tu elección. Te recomendamos el cuidado de este producto y transportarlo en su empaque.",
        type: "jarrones"
    },
    {
        id: 4,
        name: "Mesa Vintage",
        price: "30.000",
        size: "Grande",
        image: "./recursos/Vintage.png",
        ref: "0309",
        description: "Nuestro Jarrón oro rosa es el complemento ideal para tu decoración en tonos tierras, nudes, rosas, o como quieras combinarlo. Puedes llevarlo con las flores artificiales color rosa o decorarlo con flores naturales a tu elección. Te recomendamos el cuidado de este producto y transportarlo en su empaque.",
        type: "mesas"
    }
    
];

const seccionDeProductos = document.getElementById("productos");

const pintarProducto = (item) => {
    const producto = document.createElement("a");
    producto.className = "producto";

    producto.setAttribute("href", `./producto.html?id=${item.id}`)
    
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
    
                    <img src="./recursos/BotonCarrito.png" alt="" class="producto__botonCarro">
    
                </div>
    
    `;

    seccionDeProductos.appendChild(producto);
};

productos.forEach(producto => {
    pintarProducto(producto);
});