import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGslf0Fb5UyRznRSE6mEu08hctRBTiN5Q",
  authDomain: "aquaterra-studio.firebaseapp.com",
  projectId: "aquaterra-studio",
  storageBucket: "aquaterra-studio.appspot.com",
  messagingSenderId: "299614342773",
  appId: "1:299614342773:web:5b5dd8e1dbf63f8117323c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

const handleRecupero = (email) => {
  if (!email) {
    alert("Por favor, ingresa tu email.");
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => alert("Email de recuperación enviado"))
    .catch((error) => alert("Error: " + error.message));
};