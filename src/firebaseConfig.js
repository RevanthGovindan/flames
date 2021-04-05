import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB742l1RoQb1jmAzr4cYH_ArJbX5y3hU-g",
    authDomain: "flames-5e2bc.firebaseapp.com",
    projectId: "flames-5e2bc",
    storageBucket: "flames-5e2bc.appspot.com",
    messagingSenderId: "1014306126518",
    appId: "1:1014306126518:web:12f866d6669504b3f74417"
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const database = firebase.database();
export { storage, database };