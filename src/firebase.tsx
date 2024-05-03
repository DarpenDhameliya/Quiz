
import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA5V922ui9E0OQikY-K6NIOvzLRSKYZatQ',
  authDomain: 'quize-3ea57.firebaseapp.com',
  projectId: 'quize-3ea57',
  storageBucket: 'quize-3ea57.appspot.com',
  messagingSenderId: '937199293414',
  appId: '1:937199293414:web:fae8fb31876a7796a93c27',
  measurementId: "G-Z35XX3JKD6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase


