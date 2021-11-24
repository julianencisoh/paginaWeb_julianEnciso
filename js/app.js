import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore, collection, getDocs} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
//const auth = getAuth();
const db = getFirestore(app);

let productos = [];
let userLogged = null;
let cart = [];

const getAllProducts = async() => {
    const collectionRef = collection(db, "productos");
    const { docs } = await getDocs(collectionRef);

    const firebaseProducts = docs.map((doc) => {
        return {
            ...doc.data(),
            id: doc.id,
        }
    })

    console.log(firebaseProducts);
    
    firebaseProducts.forEach(producto => {
    pintarProducto(producto);
    });

    productos = firebaseProducts;

};






const getMyCart = () => {
    const carrito = localStorage.getItem("carrito");
    return carrito ? JSON.parse(carrito) : [];
};

const carrito = getMyCart();


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
                            <h3 class="producto__valor">${ formatCurrency(item.price) }</h3>
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
            image: item.image,
            price: item.price,
        };

        carrito.push(productoAgregado);

        localStorage.setItem("carrito", JSON.stringify(carrito));

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

    productosYaFiltrados.forEach(producto =>{
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

localStorage.setItem("user", "Julian Enciso");

const user = {
    name: "julian",
    email: "encisojulian1@gmail.com"
}

localStorage.setItem("user", JSON.stringify(user));


getAllProducts();