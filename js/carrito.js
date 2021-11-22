
const cartSection = document.getElementById("carrito");
const totalSection = document.getElementById("total");


const getMyCart = () => {
    const carrito = localStorage.getItem("carrito");
    return carrito ? JSON.parse(carrito) : [];
};

const removeProduct = (productoId) => {
    const carrito = getMyCart();
    const newCart = carrito.filter(producto => producto.id !== productoId);
    localStorage.setItem("carrito", JSON.stringify(newCart));

    renderMyCart();
};

const renderProduct = (producto) => {
    console.log(producto);
    const newProduct = document.createElement("li");
    newProduct.className = "productoo";
    newProduct.innerHTML = `
        <img src="${producto.image}" alt="" class="productoo__imagen">

        <div class="productoo__info">
            <h2 class="productoo__nombre">${producto.name}</h2>
            <h3 class="productoo__precio">${formatCurrency(producto.price) }</h3>
        </div>
        <button class="productoo__boton">Remover</button>
    `;

    cartSection.appendChild(newProduct);

    newProduct.addEventListener("click", e => {

        if(e.target.tagName === "BUTTON"){
            removeProduct(producto.id);  
        }
        console.log("dio click!");
    });

};

const  renderMyCart = () => {
    const carrito = getMyCart();
    let total  = 0;
    cartSection.innerHTML = "";
    
    carrito.forEach(producto => {
        console.log(producto);
        total += producto.price;
        renderProduct(producto);
    });

    totalSection.innerText =`Total: ${formatCurrency(total)}`;
};

renderMyCart();

console.log(total);