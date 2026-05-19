// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyComLLZChfLC-05Gy2pXG2-Wih_aaWsHSc",
  authDomain: "players-8917b.firebaseapp.com",
  projectId: "players-8917b",
  storageBucket: "players-8917b.firebasestorage.app",
  messagingSenderId: "813207222792",
  appId: "1:813207222792:web:4964a83de3c382d9aa6fbd",
  measurementId: "G-HNB24H331E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;