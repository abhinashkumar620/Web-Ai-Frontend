// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_Firbase_apiKey,
    authDomain: "webai-886df.firebaseapp.com",
    projectId: "webai-886df",
    storageBucket: "webai-886df.firebasestorage.app",
    messagingSenderId: "128247464375",
    appId: "1:128247464375:web:b50fe3d04cabb3a06ce832"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export { auth, provider }