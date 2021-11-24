const firebaseConfig = {
    apiKey: "AIzaSyCRwFnHXfu-gj5KWKeBhM8rjk4e5SW12lQ",
    authDomain: "carrito-6a685.firebaseapp.com",
    projectId: "carrito-6a685",
    storageBucket: "carrito-6a685.appspot.com",
    messagingSenderId: "11133931309",
    appId: "1:11133931309:web:5727d878d22c83d3140da4",
};


const formatCurrency = (price) => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    }).format(price);
};