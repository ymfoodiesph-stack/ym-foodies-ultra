// js/main.js

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwVc1iJiHINFlkjIVKajw6vlRSg3b_K1bzFu3hII2-G5dDM7GyG7gcWf2i95aEaizlokg/exec";

// Load products from Google Sheets
async function loadProducts() {
  try {
    const response = await fetch(`${SCRIPT_URL}?action=products`);
    const products = await response.json();

    const menuContainer = document.getElementById("menu-container");
    if (!menuContainer) return;

    menuContainer.innerHTML = "";
    products.forEach(product => {
      menuContainer.innerHTML += `
        <div class="product-card">
          <img src="${product.ImageURL}" alt="${product['Product Name']}">
          <h3>${product['Product Name']} - ${product.Variant}</h3>
          <p>₱${product.Price}</p>
          <button onclick="addToCart('${product.ProductID}','${product['Product Name']}', ${product.Price})">
            Add to Cart
          </button>
        </div>
      `;
    });
  } catch (err) {
    console.error("Failed to load products:", err);
  }
}

// Call on menu page
document.addEventListener("DOMContentLoaded", loadProducts);
