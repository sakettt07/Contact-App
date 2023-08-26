// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjxfqVWSWx-o8sTXDYxd6sGKHfjdg4qiI",
  authDomain: "contact-app-8bb7e.firebaseapp.com",
  projectId: "contact-app-8bb7e",
  storageBucket: "contact-app-8bb7e.appspot.com",
  messagingSenderId: "263572492191",
  appId: "1:263572492191:web:a1511d6d5b3405d6e0b7aa"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db=getFirestore(app);