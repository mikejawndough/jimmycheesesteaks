// public/js/order.js

// Add to Cart function with infused dropdown support
function addToCart(button) {
  const itemName = button.getAttribute("data-name");
  const basePrice = parseFloat(button.getAttribute("data-price"));

  const menuItem = button.closest(".menu-item");
  const select = menuItem.querySelector(".infused-select");
  const qtySelect = menuItem.querySelector(".quantity-select");

  const infusedOption = select ? select.value : "regular";
  const quantity = qtySelect ? parseInt(qtySelect.value) : 1;

  let finalPrice = basePrice;
  let itemLabel = itemName;

  if (infusedOption === "infused") {
    finalPrice += 20;
    itemLabel += " (Infused)";
  }

  const cartItem = {
    name: itemLabel,
    price: finalPrice,
    quantity: quantity,
    infused: infusedOption === "infused"
  };

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(i => i.name === cartItem.name && i.infused === cartItem.infused);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  if (typeof updateHeaderCart === "function") {
    updateHeaderCart();
  }

  console.log("Added to cart:", cartItem);
}