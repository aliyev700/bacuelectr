const token = localStorage.getItem("token");

if (!token) {
  alert("Daxil olmamısan");
  window.location.href = "login.html";
}

const LOCAL_BASE = "http://localhost:3000";
const form = document.getElementById("form");
const propertiesList = document.getElementById("properties-list");
const deleteAllBtn = document.getElementById("delete-all");


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newProperty = {
    title: document.getElementById("title").value.trim(),
    photo: document.getElementById("photo").value.trim(),
    oldprice: document.getElementById("oldprice").value.trim(),
    price: Number(document.getElementById("price").value),
    specs: document.getElementById("specs").value.trim(),
    rating: Number(document.getElementById("rating").value),
    comments: Number(document.getElementById("comments").value),
  };

  if (!newProperty.title || !newProperty.photo || !newProperty.price) {
    return alert("Title, photo və price mütləq doldurulmalıdır!");
  }

  if (newProperty.rating < 0 || newProperty.rating > 5) {
    return alert("Rating yalnız 0–5 arasında ola bilər!");
  }

  try {
    await fetch(`${LOCAL_BASE}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProperty),
    });

    alert("Product əlavə olundu!");
    form.reset();
    fetchProperties();
  } catch (err) {
    console.error(err);
    alert("Xəta: product əlavə olunmadı");
  }
});


deleteAllBtn.addEventListener("click", async () => {
  try {
    const res = await fetch(`${LOCAL_BASE}/products`);
    const data = await res.json();
    if (!data.length) return alert("Silinəcək product yoxdur");

    await Promise.all(
      data.map((item) =>
        fetch(`${LOCAL_BASE}/products/${item.id}`, { method: "DELETE" })
      )
    );

    propertiesList.innerHTML = "";
    alert("Bütün productlar silindi!");
  } catch (err) {
    console.error(err);
  }
});


const readyLinkInput = document.getElementById("photo-ready-link");
const copyPhotoBtn = document.getElementById("copy-photo");

copyPhotoBtn.addEventListener("click", () => {
  readyLinkInput.select();
  navigator.clipboard
    .writeText(readyLinkInput.value)
    .then(() => alert("iPhone URL kopyalandı"))
    .catch(() => alert("Kopyalama alınmadı."));
});

const readyLinkInput1 = document.getElementById("photo-ready-link1");
const copyPhotoBtn1 = document.getElementById("copy-photo1");

copyPhotoBtn1.addEventListener("click", () => {
  readyLinkInput1.select();
  navigator.clipboard
    .writeText(readyLinkInput1.value)
    .then(() => alert("Honor URL kopyalandı"))
    .catch(() => alert("Kopyalama alınmadı."));
});


async function fetchProperties() {
  try {
    const res = await fetch(`${LOCAL_BASE}/products`);
    const data = await res.json();
    renderProperties(data);
  } catch (err) {
    console.error(err);
  }
}

function renderProperties(products) {
  propertiesList.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product-card", "border", "p-4", "mb-2", "rounded");
    div.innerHTML = `
      <h3>${product.title}</h3>
      <p>Price: ${product.price} ₼</p>
      <p>Old Price: ${product.oldprice}</p>
      <img src="${product.photo}" width="100">
      <p>Specs: ${product.specs}</p>
      <p>Rating: ${product.rating}</p>
      <p>Comments: ${product.comments}</p>
      <button class="edit-btn bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
      <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded">Delete</button>
    `;
    propertiesList.appendChild(div);


    div.querySelector(".edit-btn").addEventListener("click", async () => {
      const newTitle = prompt("New title:", product.title) || product.title;
      const newPrice = prompt("New price:", product.price) || product.price;
      const newOldPrice =
        prompt("New old price:", product.oldprice) || product.oldprice;
      const newPhoto = prompt("New photo URL:", product.photo) || product.photo;
      const newSpecs = prompt("New specs:", product.specs) || product.specs;
      const newRating = prompt("New rating:", product.rating) || product.rating;
      const newComments =
        prompt("New comments:", product.comments) || product.comments;

      const updatedProduct = {
        title: newTitle,
        price: Number(newPrice),
        oldprice: newOldPrice,
        photo: newPhoto,
        specs: newSpecs,
        rating: Number(newRating),
        comments: Number(newComments),
      };


      if (updatedProduct.rating < 0 || updatedProduct.rating > 5) {
        return alert("Rating ancaq 0–5  ola bilər!");
      }

      await fetch(`${LOCAL_BASE}/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      alert("Product yeniləndi!");
      fetchProperties();
    });


    div.querySelector(".delete-btn").addEventListener("click", async () => {
      await fetch(`${LOCAL_BASE}/products/${product.id}`, { method: "DELETE" });
      fetchProperties();
    });
  });
}


fetchProperties();
