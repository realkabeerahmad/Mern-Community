// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8jISns72djFyJfZHjFuT8RbRkwvu1Ovc",
  authDomain: "pethub-ea211.firebaseapp.com",
  projectId: "pethub-ea211",
  storageBucket: "pethub-ea211.appspot.com",
  messagingSenderId: "349267574155",
  appId: "1:349267574155:web:a33377bcb20be4b06b838e",
  measurementId: "G-75JCTM5WV7",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
