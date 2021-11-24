import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore, doc, getDoc} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getProduct = async () => {
    const url = window.location.search;
    var searchParams = new URLSearchParams(url);
    const productoId = searchParams.get("id");

    const docRef = doc(db, "productos", productoId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    loadProductInfo(data);

    console.log(data);
}




//const producto = productos.find(producto => producto.id == productoId); 

const imagenProducto = document.getElementById("imagenProducto");
const nombreProducto = document.getElementById("nombreProducto");
const descripcionProducto = document.getElementById("descripcionProducto");
const precioProducto = document.getElementById("precioProducto");


const loadProductInfo = (producto) => {

    nombreProducto.innerText = producto.name;
    descripcionProducto.innerText = producto.description;
    precioProducto.innerText =`${ formatCurrency(producto.price) }`;
    imagenProducto.setAttribute("src", producto.image);
};





getProduct();