

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAW7crVYlZ-Xe8xkxkheADgX-MmoLD7Wdc",
  authDomain: "pf502-6afee.firebaseapp.com",
  projectId: "pf502-6afee",
  storageBucket: "pf502-6afee.appspot.com",
  messagingSenderId: "234504631459",
  appId: "1:234504631459:web:a0903b29a49b566dd0bb16"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
