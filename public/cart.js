
let cart = JSON.parse(localStorage.getItem("cart")) || [];


const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartTotalFinal = document.getElementById("cartTotalFinal");
const clearCartBtn = document.getElementById("clearCartBtn");


function renderCart() {
  cartItems.innerHTML = ""; 
  let total = 0;

  cart.forEach((item, index) => {
    const quantity = item.quantity || 1;
    const price = Number(item.price) || 0;

    const li = document.createElement("li");
    li.className = "flex items-center justify-between py-4 border-b";

    li.innerHTML = `
      <div class="flex items-center gap-4">
        
       
        <div>
          <p class="font-medium">${item.product}</p>
          <p class="text-sm text-gray-500">Color: ${item.name || 'Default'} | Size: ${item.memory || '256gb'}</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button class="bg-gray-300 px-2 rounded minus">-</button>
        <span class="quantity">${quantity}</span>
        <button class="bg-gray-300 px-2 rounded plus">+</button>
        <span class="ml-4">${(price * quantity).toFixed(2)} ₼</span>
        <button class="bg-red-500 text-white px-2 py-1 rounded ml-4 delete">delete</button>
      </div>
    `;

    
    li.querySelector(".minus").addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        saveAndRender();
      }
    });

    li.querySelector(".plus").addEventListener("click", () => {
      item.quantity++;
      saveAndRender();
    });


    li.querySelector(".delete").addEventListener("click", () => {
      cart.splice(index, 1);
      saveAndRender();
    });

    cartItems.appendChild(li);

    total += price * quantity;
  });

  cartTotal.textContent = total.toFixed(2) + " ₼";
  cartTotalFinal.textContent = total.toFixed(2) + " ₼";
}


function saveAndRender() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}


clearCartBtn.addEventListener("click", () => {
  if (confirm("hamisin silek?")) {
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
  }
});

renderCart();
