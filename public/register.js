
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

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
  const form = document.getElementById("registerForm");
  const result = document.getElementById("result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();


    if (!name || !email || !password || !confirmPassword) {
      showMessage("⚠️ Bütün sahələri doldurun!", "red");
      return;
    }
    if (password.length < 6) {
      showMessage("⚠️ Şifrə ən azi 6 simvol olmalidir!", "red");
      return;
    }
    if (password !== confirmPassword) {
      showMessage("⚠️ Şifrələr eyni deyil!", "red");
      return;
    }

    showMessage("⏳ Qeydiyyat davam edir", "gray");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      showMessage(`✅ Xoş gəldin abi`, "green");

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);

    } catch (error) {
      console.error("Xəta:", error.code, error.message);

      let message = "❌ Qeydiyyat ainmadi";
      if (error.code === "auth/email-already-in-use") message = "Bu email artiq istifadə olunur";
      if (error.code === "auth/invalid-email") message = "Email düzgün deyil";
      if (error.code === "auth/weak-password") message = "Şifrə çox zəifdir";

      showMessage(message, "red");
    }
  });

  function showMessage(msg, color) {
    result.innerHTML = msg;
    result.className = `mt-4 text-sm text-center text-${color}-600 font-semibold`;
  }
});
