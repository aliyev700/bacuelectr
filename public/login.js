
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyAW7crVYlZ-Xe8xkxkheADgX-MmoLD7Wdc",
  authDomain: "pf502-6afee.firebaseapp.com",
  projectId: "pf502-6afee",
  storageBucket: "pf502-6afee.firebasestorage.app",
  messagingSenderId: "234504631459",
  appId: "1:234504631459:web:a0903b29a49b566dd0bb16",
  measurementId: "G-KHT7DMF568"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const result = document.getElementById("result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("username").value.trim(); 
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      showMessage(" Bütün inputlari doldurun!", "red");
      return;
    }

    showMessage("⏳ Daxil olma davam edir...", "gray");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      

      localStorage.setItem("token", user.uid);
      

      window.location.href = "./admin.html";
      
    } catch (error) {
      console.error("Xəta:", error.code, error.message);

      let message = "❌ İstifadəçi adi ve ya şifre səhvdir";
      if (error.code === "auth/user-not-found") message = "İstifadəçi tapilmadi";
      if (error.code === "auth/wrong-password") message = "Şifrə səhvdir";

      showMessage(message, "red");
    }
  });

  function showMessage(msg, color) {
    result.innerHTML = msg;
    result.className = `mt-4 text-sm text-center text-${color}-600 font-semibold`;
  }
});
