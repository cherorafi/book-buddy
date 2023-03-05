// firebase setup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDcX2OTyssvd6goMtm_Y0ju4QN2pB3Tuxc",
  authDomain: "book-buddy-f712f.firebaseapp.com",
  projectId: "book-buddy-f712f",
  storageBucket: "book-buddy-f712f.appspot.com",
  messagingSenderId: "1062350983152",
  appId: "1:1062350983152:web:d12b82f2fc2fc1b7371735",
  measurementId: "G-08HGGPN7CR"
}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
