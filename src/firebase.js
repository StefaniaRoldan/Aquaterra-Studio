import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGslf0Fb5UyRznRSE6mEu08hctRBTiN5Q",
  authDomain: "aquaterra-studio.firebaseapp.com",
  projectId: "aquaterra-studio",
  storageBucket: "aquaterra-studio.appspot.com",
  messagingSenderId: "299614342773",
  appId: "1:299614342773:web:5b5dd8e1dbf63f8117323c"
};

// Inicializar Firebase App
const app = initializeApp(firebaseConfig);

// Inicializar Auth y Firestore
const auth = getAuth(app);
const firestore = getFirestore(app);

/**
 * Enviar email para recuperación de contraseña
 * @param {string} email
 */
const handleRecupero = (email) => {
  if (!email) {
    alert("Por favor, ingresa tu email.");
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => alert("Email de recuperación enviado"))
    .catch((error) => {
      console.error("Error al enviar email de recuperación:", error);
      alert("Error: " + error.message);
    });
};

export { app, auth, firestore, handleRecupero };