import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

// linkonfreelance@gmail.com

export const firebaseApp = initializeApp({
    apiKey: 'AIzaSyBejeKnBzwH7_KbMIY2DrHvAtKgfkmsUCY',
    authDomain: 'devkon63.firebaseapp.com',
    projectId: 'devkon63',
    storageBucket: 'devkon63.appspot.com',
    messagingSenderId: '337133988120',
    appId: '1:337133988120:web:14f8d7c6278b29099d166d'
});

// used for the firestore refs
const db = getFirestore(firebaseApp);

// here we can export reusable database references
export const todosRef = collection(db, 'todos');

// import firebase from 'firebase'
// import firestore from 'firebase/firestore'

// import { initializeApp } from 'firebase/app'
// import { getFirestore, collection } from 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: "AIzaSyBejeKnBzwH7_KbMIY2DrHvAtKgfkmsUCY",
//   authDomain: "devkon63.firebaseapp.com",
//   projectId: "devkon63",
//   storageBucket: "devkon63.appspot.com",
//   messagingSenderId: "337133988120",
//   appId: "1:337133988120:web:14f8d7c6278b29099d166d"
// };
// // Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig);

// export default firebaseApp.firestore()
