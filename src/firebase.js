import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyCcOQkppwUFnITlmh0lSEXS074JAS5H2Oc",

    authDomain: "nutrition-diary-58b47.firebaseapp.com",

    projectId: "nutrition-diary-58b47",

    storageBucket: "nutrition-diary-58b47.appspot.com",

    messagingSenderId: "416908158715",

    appId: "1:416908158715:web:2aa13f23e1e3d90e29b25e"

};


// Initialize Firebase

const NutritionDatabase = initializeApp(firebaseConfig);

export default NutritionDatabase;