


const LOCAL_BASE = "http://localhost:3000";
const propertiesList1 = document.getElementById("properties-list-1");
const propertiesList2 = document.getElementById("properties-list-2");

async function fetchProperties() {
  try {
    const res = await fetch(`${LOCAL_BASE}/products`);
    if (!res.ok) throw new Error("Ошибка ");
    const data = await res.json();

    renderProperties(data, propertiesList1);
    renderProperties(data, propertiesList2);
  } catch (err) {
    console.error(err);
  }
}


function renderProperties(properties, container) {
  container.innerHTML = "";
  properties.forEach((p) => {
    const html = `  <div class="honor dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 transition-colors duration-500 mt-12 p-4 rounded-2xl w-[240px] h-[380px] bg-white shadow-xl bg-[#EDE8E8]">
         <img class="mb-5 relative bottom-[48px] border shadow-2xl rounded-2xl left-8 w-[140px] h-44" 
              src="${p.photo || 'https://picsum.photos/140/140'}" 
            alt="${p.title || 'Product'}">
        <div class="honorstext relative bottom-[64px]">
           <div class="star flex gap-4">
             <i class="text-[#880808] ri-star-line"></i>
             <p>${p.rating || 0}</p>
             <i class="text-[#880808] ri-chat-1-line"></i>
             <p>${p.comments || 0}</p>
           </div>
           <p class="text-[19px] mt-2">${p.title || 'Smartfon XYZ'} <br> ${p.specs || ''}</p>
          <div class="price mt-2">
             <p class="text-gray text-[14px]">
               ${p.oldprice ? `<s>${p.oldprice} ₼</s>` : ""}
             </p>
             <p>${p.price ? p.price + ' ₼' : '0 ₼'}</p>
           </div>
          <div class="buttons flex mt-4 gap-1">
            <button 
              class="add-to-cart dark:text-black p-2 rounded-xl hover:bg-[#EE4B2B] transition duration-500 border bg-[#DBD7D7] shadow-xl"
              data-name="${p.title}"
              data-price="${p.price}">
               <i class="ri-cursor-line"></i> Sebete Elave Et
             </button>
             <button class="dark:text-black border hover:bg-[#EE4B2B] transition duration-500 rounded-xl bg-[#DBD7D7] shadow-xl w-[35px]">
               <i class="ri-poker-hearts-line"></i>
             </button>
           </div>
                    </div>
       </div>`;
    container.insertAdjacentHTML("beforeend", html);
  });






  container.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = btn.getAttribute("data-name");
      const price = parseFloat(btn.getAttribute("data-price")) || 0;

     
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

    
      cart.push({ product, price });

     
      localStorage.setItem("cart", JSON.stringify(cart));

     
    });
  });
}


fetchProperties();



function addToCart(product, price, quantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  
  const existingItem = cart.find(item => item.product === product);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, price, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product} добавлено`);
}



const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
  
  localStorage.removeItem("token");

  
  
});