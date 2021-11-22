const url = window.location.search;
var searchParams = new URLSearchParams(url);

const productoId = searchParams.get("id");

const producto = productos.find(producto => producto.id == productoId); 

const imagenProducto = document.getElementById("imagenProducto");
const nombreProducto = document.getElementById("nombreProducto");
const descripcionProducto = document.getElementById("descripcionProducto");
const precioProducto = document.getElementById("precioProducto");

nombreProducto.innerText = producto.name;
descripcionProducto.innerText = producto.description;
precioProducto.innerText =`${ formatCurrency(producto.price) }`;
imagenProducto.setAttribute("src", producto.image);