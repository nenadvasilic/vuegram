import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwsRNNiTQpQexmtipLtaAQzQuQZ4dfB1Y",
  authDomain: "fipugram-4ecba.firebaseapp.com",
  projectId: "fipugram-4ecba",
  storageBucket: "fipugram-4ecba.appspot.com",
  messagingSenderId: "371939248472",
  appId: "1:371939248472:web:72d1cd1f9ae14341243d2d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let storage = firebase.storage();

// export default firebase;
export { firebase, db, storage };
