const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const form = document.getElementById('form');
const thankYouEl = document.getElementById('thankyou');

let cart = JSON.parse(localStorage.getItem('cart')) || [];


function renderCart() {
  cartItemsEl.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<li>Your cart is empty.</li>';
  }

  cart.forEach(item => {
    const quantity = item.quantity || 1;
    const price = Number(item.price) || 0;

    const li = document.createElement('li');
    li.className = "flex justify-between py-2 border-b";
    li.innerHTML = `
      <span>${item.product} x ${quantity}</span>
      <span>${(price * quantity).toFixed(2)} ₼</span>
    `;
    cartItemsEl.appendChild(li);

    total += price * quantity;
  });

  cartTotalEl.textContent = total.toFixed(2) + " ₼";
}


renderCart();


if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(cart.length === 0){
      alert("Sebet bosdu");
      return;
    }

    const order = {
      id: Date.now(),
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      address: document.getElementById('address').value,
      items: cart,
      total: cartTotalEl.textContent
    };


    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    localStorage.removeItem('cart');
    cart = [];
    renderCart();

    form.style.display = 'none';
    thankYouEl.classList.remove('hidden');
    alert("    Thank you for your order ");
  });
}
