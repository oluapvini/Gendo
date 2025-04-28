// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAMjsZz5MrJG50HQ_xyyIsnoHGVanpaNYY",
  authDomain: "gendo-50614.firebaseapp.com",
  projectId: "gendo-50614",
  storageBucket: "gendo-50614.appspot.com",
  messagingSenderId: "158558109826",
  appId: "1:158558109826:web:a13330fabdac442008749b",
  measurementId: "G-1CFJMMS2ST" //ignorado, faz parte do analytics
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

// Exporta o banco
export { db };
