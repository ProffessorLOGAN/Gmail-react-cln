import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjCGdEFucq67XQUl12f4Ub1LDcF-MS-5c",
  authDomain: "react--cln.firebaseapp.com",
  projectId: "react--cln",
  storageBucket: "react--cln.appspot.com",
  messagingSenderId: "934011416851",
  appId: "1:934011416851:web:7f77692b3c6a6efbc8eae6",
  measurementId: "G-F4TS9QYS4W"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
