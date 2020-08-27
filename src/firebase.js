//Firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "ev-charging-stations-d58c7.firebaseapp.com",
  databaseURL: "https://ev-charging-stations-d58c7.firebaseio.com",
  projectId: "ev-charging-stations-d58c7",
  storageBucket: "ev-charging-stations-d58c7.appspot.com",
  messagingSenderId: "386362041905",
  appId: "1:386362041905:web:e1a514c9e443bd6b299710",
  measurementId: "G-DG4ZQZ1490",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Create Instance of Google provider object
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;
