// js/admin.js

async function loadAdminData() {
  try {
    const response = await fetch(`${SCRIPT_URL}?action=orders`);
    const orders = await response.json();

    // Stats
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.Status === "Pending").length;
    const revenue = orders.reduce((acc, o) => acc + parseFloat(o.Total || 0), 0);

    document.getElementById("total-orders").innerText = totalOrders;
    document.getElementById("pending-orders").innerText = pendingOrders;
    document.getElementById("revenue").innerText = `₱${revenue}`;

    // Render table
    const table = document.getElementById("orders-table-body");
    table.innerHTML = "";

    orders.forEach(o => {
      table.innerHTML += `
        <tr>
          <td>${o.OrderID}</td>
          <td>${o.CustomerName}</td>
          <td>${o.Items}</td>
          <td>₱${o.Total}</td>
          <td>${o.Status}</td>
          <td>${o.Date}</td>
        </tr>
      `;
    });

  } catch (err) {
    console.error("Failed to load admin data:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadAdminData);
