import firebase from 'firebase'
import firestore from 'firebase/firestore'




// Initialize Firebase
var config = {
  apiKey: "AIzaSyANBHcV8dFhSy0WwR7x6JlXgOImTarr-a0",
  authDomain: "alka-s-sandwich-bar.firebaseapp.com",
  databaseURL: "https://alka-s-sandwich-bar.firebaseio.com",
  projectId: "alka-s-sandwich-bar",
  storageBucket: "alka-s-sandwich-bar.appspot.com",
  messagingSenderId: "728310970341"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true})
export default firebaseApp.firestore()