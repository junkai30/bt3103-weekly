import firebase from 'firebase';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBavBvB71AMHRsvf9FoKL-LHy0AOOTK54Y",
    authDomain: "bt3103-week-6-cedb5.firebaseapp.com",
    projectId: "bt3103-week-6-cedb5",
    storageBucket: "bt3103-week-6-cedb5.appspot.com",
    messagingSenderId: "283472769526",
    appId: "1:283472769526:web:f6b9edac8fda597b9117d7",
    measurementId: "G-8GRR2EVCDH"
};

//initialize
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;



