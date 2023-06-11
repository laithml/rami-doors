// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCXb-E1K86C4KPmj4Xl67Q7qBTi4aaXgZg",
    authDomain: "ramidoors.firebaseapp.com",
    projectId: "ramidoors",
    storageBucket: "ramidoors.appspot.com",
    messagingSenderId: "266369061455",
    appId: "1:266369061455:web:69be27f812b719c5b8903a",
    measurementId: "G-QQ1TWRH6H2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);