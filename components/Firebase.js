// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYitEc-BhQ8qQCgokKF2G5SSaeSgnnIkI",
  authDomain: "agendapam-cdae9.firebaseapp.com",
  databaseURL: "https://agendapam-cdae9-default-rtdb.firebaseio.com",
  projectId: "agendapam-cdae9",
  storageBucket: "agendapam-cdae9.appspot.com",
  messagingSenderId: "785162244400",
  appId: "1:785162244400:web:3c29b3967c4f5b04a678f5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
export default firebase;
