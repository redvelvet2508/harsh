// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  "apiKey": "AIzaSyDYkIrFD5Mfvk4AjCyjP17XCOf_HF9Xc7o",
  "authDomain": "boutique-a3cca.firebaseapp.com",
  "projectId": "boutique-a3cca",
  "storageBucket": "boutique-a3cca.appspot.com",
  "messagingSenderId": "738695344243",
  "appId": "1:738695344243:web:12a56f3a4e830399023a06",
  "measurementId": "G-3HTMPGRP5Z",
  "databaseURL": "https://boutique-a3cca-default-rtdb.firebaseio.com/"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);