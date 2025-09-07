

const token = localStorage.getItem("token");

if (!token) {
  alert("Siz daxil olmalısınız!");
  window.location.href = "login.html";
}






const LOCAL_BASE = "http://localhost:3000";
const form = document.getElementById('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newProperty = {
    title: document.getElementById('title').value,
    photo: document.getElementById('photo').value,
    oldprice: document.getElementById('oldprice').value,
    price: Number(document.getElementById('price').value),
    specs: document.getElementById('specs').value,
    rating: Number(document.getElementById('rating').value),
    comments: Number(document.getElementById('comments').value),
    
  };

  try {
    const res = await fetch(`${LOCAL_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProperty)
    });

    alert("Product added successfully!");
    form.reset();

  } catch (err) {
    console.error(err);
    alert("Error adding product. Check console.");
  }
});

    
    const deleteAllBtn = document.getElementById("delete-all");
    const propertiesList = document.getElementById("properties-list");
    
    deleteAllBtn.addEventListener("click", async () => {
      try {
        const res = await fetch(`${LOCAL_BASE}/products`);
        const data = await res.json();
    
        await Promise.all(
          data.map(item =>
            fetch(`${LOCAL_BASE}/products/${item.id}`, { method: "DELETE" })
          )
        );
    
        propertiesList.innerHTML = "";
        
      } catch (err) {
        console.error(err);
       
      }
    });

    const readyLinkInput = document.getElementById('photo-ready-link');
    const copyPhotoBtn = document.getElementById('copy-photo');
    
    copyPhotoBtn.addEventListener('click', () => {
      readyLinkInput.select();
      navigator.clipboard.writeText(readyLinkInput.value)
        .then(() => alert("Iphone's URL "))
        .catch(() => alert("Не удалось скопировать."));
    });
  
    const readyLinkInput1 = document.getElementById('photo-ready-link1');
    const copyPhotoBtn1 = document.getElementById('copy-photo1');
    
    copyPhotoBtn1.addEventListener('click', () => {
      readyLinkInput1.select();
      navigator.clipboard.writeText(readyLinkInput1.value)
        .then(() => alert("Honor's URL "))
        .catch(() => alert("Не удалось скопировать."));
    });

    