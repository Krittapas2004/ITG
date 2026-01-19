// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgbjf34WWRyeqrEjuAP1OUJ_srZbeKkLY",
  authDomain: "itg-machine-data-storing.firebaseapp.com",
  projectId: "itg-machine-data-storing",
  storageBucket: "itg-machine-data-storing.firebasestorage.app",
  messagingSenderId: "926170628150",
  appId: "1:926170628150:web:79424f7b3f7ef30bdb5897"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);