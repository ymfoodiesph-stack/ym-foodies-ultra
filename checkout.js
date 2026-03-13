const checkoutForm = document.getElementById("checkout-form");
if(checkoutForm){
  checkoutForm.addEventListener("submit", async e => {
    e.preventDefault();
    const customerName = document.getElementById("customerName").value;
    const contact = document.getElementById("contact").value;
    const address = document.getElementById("address").value;
    const items = JSON.parse(localStorage.getItem("ymCart")) || [];
    const total = items.reduce((a,i)=>a+i.price*i.qty,0);

    if(items.length===0){ alert("Cart empty!"); return; }

    const payload = { action:"createOrder", data:{customerName,contact,address,items,total} };
    try{
      const res = await fetch("https://script.google.com/macros/s/AKfycbwVc1iJiHINFlkjIVKajw6vlRSg3b_K1bzFu3hII2-G5dDM7GyG7gcWf2i95aEaizlokg/exec,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const result = await res.json();
      if(result.success){ localStorage.removeItem("ymCart"); window.location.href="order-success.html"; }
      else alert("Order failed, try again.");
    } catch(err){ console.error(err); alert("Error placing order."); }
  });
}      localStorage.removeItem("ymCart"); // Clear cart
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
