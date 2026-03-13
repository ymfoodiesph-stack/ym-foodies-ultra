// js/order-success.js

document.addEventListener("DOMContentLoaded", () => {
  const msg = document.getElementById("success-message");
  if (msg) {
    msg.innerText = "Your order has been placed successfully!";
  }
});
