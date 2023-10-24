import {getFirestore} from "@firebase/firestore"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBts3iAgPtMySswPoFlWIZSu8XyE1tbwFA",
  authDomain: "veterinaria-7eb7a.firebaseapp.com",
  projectId: "veterinaria-7eb7a",
  storageBucket: "veterinaria-7eb7a.appspot.com",
  messagingSenderId: "536512446496",
  appId: "1:536512446496:web:e4ec5ae1fdd29b4b94fc45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const dbFirebase=getFirestore(app);