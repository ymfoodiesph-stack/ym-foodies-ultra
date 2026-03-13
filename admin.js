async function loadAdminData() {
  const table = document.getElementById("orders-table-body");
  if(!table) return;
  try{
    const res = await fetch(`${https://script.google.com/macros/s/AKfycbwVc1iJiHINFlkjIVKajw6vlRSg3b_K1bzFu3hII2-G5dDM7GyG7gcWf2i95aEaizlokg/exec}?action=orders`);
    const orders = await res.json();

    document.getElementById("total-orders").innerText = orders.length;
    document.getElementById("pending-orders").innerText = orders.filter(o=>o.Status==="Pending").length;
    document.getElementById("revenue").innerText = `₱${orders.reduce((a,o)=>a+parseFloat(o.Total||0),0)}`;

    table.innerHTML = "";
    orders.forEach(o => {
      table.innerHTML += `<tr>
        <td>${o.OrderID}</td>
        <td>${o.CustomerName}</td>
        <td>${o.Items}</td>
        <td>₱${o.Total}</td>
        <td>${o.Status}</td>
        <td>${o.Date}</td>
      </tr>`;
    });
  } catch(err){ console.error(err); }
}

document.addEventListener("DOMContentLoaded", loadAdminData);
