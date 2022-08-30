
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDo-hBOFSMOBrnQzagwmmkTCxLhsSv_30Q",
  authDomain: "tucasa365-b7dd3.firebaseapp.com",
  projectId: "tucasa365-b7dd3",
  storageBucket: "tucasa365-b7dd3.appspot.com",
  messagingSenderId: "6726229997",
  appId: "1:6726229997:web:268d5a86c2a8cd4ad451e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseConnection = () => app