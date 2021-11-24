import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, doc, getDoc, addDoc, collection, deleteDoc} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const cartSection = document.getElementById("carrito");
const totalSection = document.getElementById("total");
const checkoutForm = document.getElementById("checkout");
const autocompleteFields = document.getElementById("autofill");

let total = 0;
let carrito = [];
let userLogged = {};

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

const getFirebaseCart = async (userId) => {
    const docRef = doc(db, "carrito", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : {
        productos: []
    }
};

const getUserInfo = async (userId) => {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    } catch (e) {
        console.log(e);
    }
}

const renderProduct = (producto) => {
   
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

const  renderMyCart = (carrito) => {

    cartSection.innerHTML = "";
    total = 0;
    carrito.forEach(producto => {
        total += parseInt (producto.price);
        renderProduct(producto);
    });

    totalSection.innerText =`Total: ${formatCurrency(total)}`;
};


const deleteCart = async () => {
    try {
    await deleteDoc(doc(db, "carrito", userLogged.uid));
    renderMyCart([]);
    } catch (e) {
        console.log(e);
    }
};


const createOrder = async (userFields) => {
try{
    const order = await addDoc(collection(db, "orders"), {
        
        ...userFields,
        productos: carrito, 
        total,
        email: userLogged.email, 
        status: "pending",
    });
    alert(`Muchas Gracias por tu compra!`); 
    deleteCart();
    } catch (e) {
        console.log(e)
    }  
};


autocompleteFields.addEventListener("click", e => {
    checkoutForm.name.value = userLogged.name;
    checkoutForm.city.value = userLogged.city;
    checkoutForm.address.value = userLogged.address;
});


checkoutForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = checkoutForm.name.value;
    const city = checkoutForm.city.value;
    const address = checkoutForm.address.value;

    const userFields = {
        name,
        city,
        address
    };

    if(carrito.length ) {
        if (name && city && address) {
        createOrder(userFields);
    } else {
        alert("Completa todos los campos");
        }
    } else{
            alert("Selecciona algunos productos...")
        }
});


onAuthStateChanged(auth, async (user) => {
    if(user) {
        const result = await getFirebaseCart(user.uid);
        carrito = result.productos;
        renderMyCart(carrito);

        const userInfo = await getUserInfo(user.uid);
        userLogged = {
            ...user,
            ...userinfo
        };

    } else {
        carrito = getMyCart();
        renderMyCart(carrito);
    }
});