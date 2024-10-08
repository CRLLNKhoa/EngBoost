// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY_FIREBASE,
  authDomain: "engboost-a02ef.firebaseapp.com",
  projectId: "engboost-a02ef",
  storageBucket: "engboost-a02ef.appspot.com",
  messagingSenderId: "266777791705",
  appId: "1:266777791705:web:d1912dbcc1f3232c4842c8"
};


// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
