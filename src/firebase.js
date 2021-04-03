// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app'
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics'

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: 'AIzaSyChZFlpkrVk9vpUP31CP14579ps9LHR_lk',
  authDomain: 'chat-group-af5f2.firebaseapp.com',
  databaseURL: 'https://chat-group-af5f2-default-rtdb.firebaseio.com',
  projectId: 'chat-group-af5f2',
  storageBucket: 'chat-group-af5f2.appspot.com',
  messagingSenderId: '508701590427',
  appId: '1:508701590427:web:f5301e7877ac597d56973e',
  measurementId: 'G-KCP209TTFT'
}

// Initialize Firebase
const firebaseApp = () => firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

export default db
