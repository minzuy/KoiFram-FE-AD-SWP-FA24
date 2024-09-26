// npm install firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKEC74_AXqPb1UsgnToDnZruMEyvN8Vf0",
  authDomain: "studentmanagement-6cbf9.firebaseapp.com",
  projectId: "studentmanagement-6cbf9",
  storageBucket: "studentmanagement-6cbf9.appspot.com",
  messagingSenderId: "788561035102",
  appId: "1:788561035102:web:6590db19110d8f275119cf",
  measurementId: "G-WL3P9036QE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};