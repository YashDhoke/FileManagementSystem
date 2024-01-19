// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4zcnFs57S0-YOSJpwGYiFcenkvoYMSJc",
  authDomain: "filemanagementsystem-472e7.firebaseapp.com",
  projectId: "filemanagementsystem-472e7",
  storageBucket: "filemanagementsystem-472e7.appspot.com",
  messagingSenderId: "99695352227",
  appId: "1:99695352227:web:63eee9b2b17e15edf42216",
  measurementId: "G-GJCJ4441WD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app};