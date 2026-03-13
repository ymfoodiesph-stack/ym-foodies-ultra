// js/checkout.js

const checkoutForm = document.getElementById("checkout-form");

async function submitOrder(e) {
  e.preventDefault();

  const customerName = document.getElementById("customerName").value;
  const contact = document.getElementById("contact").value;
  const address = document.getElementById("address").value;

  let cartItems = JSON.parse(localStorage.getItem("ymCart")) || [];
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const orderData = {
    customerName,
    contact,
    address,
    items: cartItems,
    total,
  };

  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "createOrder", data: orderData })
    });

    const result = await response.json();
    if (result.success) {
      localStorage.removeItem("ymCart"); // Clear cart
      window.location.href = "order-success.html";
    } else {
      alert("Failed to place order. Try again.");
    }
  } catch (err) {
    console.error("Order submission failed:", err);
    alert("Error submitting order.");
  }
}

if (checkoutForm) checkoutForm.addEventListener("submit", submitOrder);
