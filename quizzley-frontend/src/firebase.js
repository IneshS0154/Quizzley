import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaUH4rYMN5b3NQytwQBtt1rJ0NuoN64ls",
  authDomain: "quizzley-5462f.firebaseapp.com",
  projectId: "quizzley-5462f",
  storageBucket: "quizzley-5462f.firebasestorage.app",
  messagingSenderId: "284047030775",
  appId: "1:284047030775:web:9596af72cd16e85f5216f2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
