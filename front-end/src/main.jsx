
//Entry point to the application

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMqcmGfY6HhZ1IdNozbTWe4Hz1Hd4YudQ",
  authDomain: "full-stack-react-6b662.firebaseapp.com",
  projectId: "full-stack-react-6b662",
  storageBucket: "full-stack-react-6b662.firebasestorage.app",
  messagingSenderId: "221274716691",
  appId: "1:221274716691:web:48c2035e51cc02275fdde6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* This is loading the App.jsx component page*/}
  </StrictMode>,
)
