import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// 🪄 Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAQe4Ijc5TsL9rkeQobXraPevPpBZDO9h0",
  authDomain: "arya-enterprises-2b2fa.firebaseapp.com",
  projectId: "arya-enterprises-2b2fa",
  storageBucket: "arya-enterprises-2b2fa.firebasestorage.app",
  messagingSenderId: "1061187757929",
  appId: "1:1061187757929:web:49034f3d5c51b9c300fff8",
  measurementId: "G-YN7FT9WRHP"
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Auth + Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
