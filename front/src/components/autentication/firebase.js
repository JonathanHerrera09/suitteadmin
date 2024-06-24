// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCr_-AqcKq_txx6AweUupXQAXUn0DuYZyk",
    authDomain: "onyx-window-417017.firebaseapp.com",
    projectId: "onyx-window-417017",
    storageBucket: "onyx-window-417017.appspot.com",
    messagingSenderId: "315989692574",
    appId: "1:315989692574:web:be871abe66cfd1a2802b8f",
    measurementId: "G-YW9JEYE5ZN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
export { auth, provider, signInWithPopup };


