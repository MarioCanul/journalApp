import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDwFD5y9EZHj4w9YvnE6pwWUYVH60MWW7I",
    authDomain: "react-app-jorunal.firebaseapp.com",
    projectId: "react-app-jorunal",
    storageBucket: "react-app-jorunal.appspot.com",
    messagingSenderId: "368783910491",
    appId: "1:368783910491:web:99e8f471647356fdee017e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db=firebase.firestore()
  const googleAuthprovider=new firebase.auth.GoogleAuthProvider();
  export{
      db,
      googleAuthprovider,
      firebase
  }