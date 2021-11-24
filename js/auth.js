
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCRwFnHXfu-gj5KWKeBhM8rjk4e5SW12lQ",
    authDomain: "carrito-6a685.firebaseapp.com",
    projectId: "carrito-6a685",
    storageBucket: "carrito-6a685.appspot.com",
    messagingSenderId: "11133931309",
    appId: "1:11133931309:web:5727d878d22c83d3140da4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth();
const registerForm = document.getElementById("register");
const loginForm = document.getElementById("login");
const logoutButton = document.getElementById("logout");

const createUser = async (email, password, userFields) => {
    try {
        const {user} = await createUserWithEmailAndPassword(auth, email, password); 
        const userId = user.uid;

        await setDoc(doc(db, "users", userId), userFields);

    } catch(e) {
        if(e.code === "auth/email-already-in-use"){
             console.log("Correo electronico en uso...");
        }
        if(e.code === "auth/weak-password"){
            console.log("Intenta con una contraseña más segura...");
        }
    }    
}

const login = async (email, password) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        console.log(`Bienvenido ${user.email}`);
    } catch (e){
        if(e.code === "auth/user-not-found"){
            console.log("Este usuario no existe en la base de datos");
        }
    }   
}

const logout = async () => {
    try {
        await signOut(auth);
    } catch (e) {
        console.log(e);
    }
}


registerForm.addEventListener("submit", e => {
    e.preventDefault(); 

    const name = registerForm.name.value;
    const email = registerForm.email.value;
    const password = registerForm.password.value;
    const city = registerForm.city.value;
    const address = registerForm.address.value;

    if(email && password) {
        createUser(email, password, {
            name,
            city,
            address,
            isAdmin: false,
        });
    } else {
        console.log("Completa todos los campos!");
    }

});

loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    if(email && password) {
        login(email, password);
    } else {
        console.log("completa todos los campos...");
    }
});

logoutButton.addEventListener("click", e => {
    logout();
})


onAuthStateChanged(auth, (user) => {
    if(user) {
        loginForm.classList.add("hidden");
        logoutButton.classList.add("visible");
    } else {
        loginForm.classList.remove("hidden");
        logoutButton.classList.remove("visible");
    }
});