
document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("loginForm");
  const result = document.getElementById("result");


  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

   
    if (!username) username = "emilys";
    if (!password) password = "emilyspass";

    console.log("Отправляем:", { username, password });

    result.innerHTML = "Gözlə...";
    result.className = "mt-4 text-sm text-center text-gray-600";

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "admin copy.html";

        const meRes = await fetch("https://dummyjson.com/auth/me", {
          headers: { Authorization: `Bearer ${data.token}` },
        });
        const meData = await meRes.json();

        result.innerHTML = `✅ Salam abi`;
        result.className = "mt-4 text-sm text-center text-green-600 font-semibold";
        form.style.display = "none";
      } else {
        result.innerHTML = `❌ ${data.message || " istifadəçi adı və ya şifrə səhvdir."}`;
        result.className = "mt-4 text-sm text-center text-red-600 font-semibold";
      }
    } catch (err) {
      result.innerHTML = "⚠️ Serverə qoşulmaq alınmadı.";
      result.className = "mt-4 text-sm text-center text-red-600 font-semibold";
    }
  });
});
