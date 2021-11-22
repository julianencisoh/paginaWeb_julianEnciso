
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyCRwFnHXfu-gj5KWKeBhM8rjk4e5SW12lQ",
    authDomain: "carrito-6a685.firebaseapp.com",
    projectId: "carrito-6a685",
    storageBucket: "carrito-6a685.appspot.com",
    messagingSenderId: "11133931309",
    appId: "1:11133931309:web:5727d878d22c83d3140da4",
    measurementId: "G-0TX96641KL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const registerForm = document.getElementById("register");
const loginForm = document.getElementById("login");

const createUser = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch(e) {
        console.log(e.code)
        if(e.code === "auth/email-already-in-use"){
             console.log("Correo electronico en uno...")
        }
        console.log(e);
    }    
}

const login = (email, password) => {

}

registerForm.addEventListener("submit", e => {
    e.preventDefault(); 

    const name = registerForm.name.value;
    const email = registerForm.email.value;
    const password = registerForm.password.value;

    if(email && password) {
        createUser(email, password);
    } else {
        console.log("Completa todos los campos!");
    }

});