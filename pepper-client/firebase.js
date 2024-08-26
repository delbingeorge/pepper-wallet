// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBXNfpPqLlzmsrVEeaTa2L_91VJTxrhzqg",
    authDomain: "pepper-wallet.firebaseapp.com",
    projectId: "pepper-wallet",
    storageBucket: "pepper-wallet.appspot.com",
    messagingSenderId: "918909261462",
    appId: "1:918909261462:web:5417911663a299f4cd14b7",
    measurementId: "G-ZDSGFL61W9",
};

// const firebaseConfig = {
//     apiKey: "AIzaSyCschX70rTxpw2G6qlOS4Q_aYFu5JG1bHM",
//     authDomain: "pepperwallet-app.firebaseapp.com",
//     projectId: "pepperwallet-app",
//     storageBucket: "pepperwallet-app.appspot.com",
//     messagingSenderId: "1066686701584",
//     appId: "1:1066686701584:web:26611d87416e4cbd10ea95",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
