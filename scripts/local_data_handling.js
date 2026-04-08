export function loadCart() {
  return JSON.parse(localStorage.getItem("cart")) || {};
}

export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(id, amount = 1) {
  const cart = loadCart();

  if (!cart[id]) {
    cart[id] = { amount: 0 };
  }

  cart[id].amount += amount;
  saveCart(cart);
}

export function decreaseFromCart(id, amount = 1) {
  const cart = loadCart();
  if (!cart[id]) return; //Return if false/empty

  cart[id].amount -= amount;

  if (cart[id].amount <= 0) delete cart[id];
  saveCart(cart);
}

export function removeFromCart(id) {
  const cart = loadCart();
  delete cart[id];
  saveCart(cart);
}
