
import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token"); 
      alert("Вы вышли из аккаунта!");
   
    } catch (err) {
      console.error("Ошибка выхода:", err);
    }
  });
}
