// js/cart.js

let cart = JSON.parse(localStorage.getItem("ymCart")) || [];

// Add product to cart
function addToCart(id, name, price) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  saveCart();
  alert(`${name} added to cart!`);
  renderCart();
}

// Remove item
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

// Change quantity
function updateQty(id, qty) {
  const item = cart.find(i => i.id === id);
  if (item) item.qty = qty;
  saveCart();
  renderCart();
}

// Save to localStorage
function saveCart() {
  localStorage.setItem("ymCart", JSON.stringify(cart));
}

// Render cart table
function renderCart() {
  const table = document.getElementById("cart-table-body");
  const summary = document.getElementById("cart-summary");
  if (!table) return;

  table.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    table.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>₱${item.price}</td>
        <td>
          <input type="number" min="1" value="${item.qty}" onchange="updateQty('${item.id}', parseInt(this.value))">
        </td>
        <td>₱${item.price * item.qty}</td>
        <td>
          <button onclick="removeFromCart('${item.id}')">Remove</button>
        </td>
      </tr>
    `;
  });

  if (summary) summary.innerHTML = `Total: ₱${total}`;
}

// Initialize cart page
document.addEventListener("DOMContentLoaded", renderCart);
