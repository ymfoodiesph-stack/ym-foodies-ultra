function addToCart(id, name, price) {
  const cart = JSON.parse(localStorage.getItem("ymCart")) || [];
  const existing = cart.find(item => item.id === id);
  if(existing) existing.qty++;
  else cart.push({id, name, price, qty:1});
  localStorage.setItem("ymCart", JSON.stringify(cart));
  alert(`${name} added to cart`);
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("ymCart")) || [];
  const tbody = document.getElementById("cart-table-body");
  if(!tbody) return;
  tbody.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    tbody.innerHTML += `<tr>
      <td>${item.name}</td>
      <td>₱${item.price}</td>
      <td>${item.qty}</td>
      <td>₱${item.price * item.qty}</td>
      <td><button onclick="removeCartItem('${item.id}')">Remove</button></td>
    </tr>`;
  });
  const summary = document.getElementById("cart-summary");
  if(summary) summary.innerText = `Total: ₱${total}`;
}

function removeCartItem(id) {
  let cart = JSON.parse(localStorage.getItem("ymCart")) || [];
  cart = cart.filter(i => i.id !== id);
  localStorage.setItem("ymCart", JSON.stringify(cart));
  renderCart();
}

document.addEventListener("DOMContentLoaded", renderCart);
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
