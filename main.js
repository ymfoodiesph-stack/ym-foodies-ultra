const SCRIPT_URL = "https://script.google.com/macros/s/.../exec";

async function loadProducts() {
  try {
    const res = await fetch(`${SCRIPT_URL}?action=products`);
    const products = await res.json();

    const menuContainer = document.getElementById("menu-container");
    if (!menuContainer) return;

    menuContainer.innerHTML = "";
    products.forEach(p => {
      menuContainer.innerHTML += `
        <div class="product-card">
          <img src="${p.ImageURL}" alt="${p['Product Name']}">
          <h3>${p['Product Name']} - ${p.Variant}</h3>
          <p>₱${p.Price}</p>
          <button onclick="addToCart('${p.ProductID}','${p['Product Name']}', ${p.Price})">Add to Cart</button>
        </div>
      `;
    });
  } catch(err) { console.error(err); }
}

document.addEventListener("DOMContentLoaded", loadProducts);
