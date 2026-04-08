import {
  addToCart,
  decreaseFromCart,
  loadCart,
  removeFromCart,
} from "./local_data_handling.js";

document.addEventListener("DOMContentLoaded", updateShoppingCart);

async function updateShoppingCart() {
  const shoppingCartList = loadCart();

  const container = document.getElementById("products");
container.innerHTML = "";

  if (Object.keys(shoppingCartList).length === 0) {
    document.getElementById("products").innerText =
      "Your Shopping Cart is empty";
  } else {
    console.log(shoppingCartList);
    console.log(JSON.parse(localStorage.getItem("cart")));
    for (const id in shoppingCartList) {
      const productRetrieved = await getSingleProduct(id);

      

      const div = document.createElement("div");
      div.innerHTML = `
      <div class="row align-items-center" data-product-id=${productRetrieved.id}>
        <div class="col-2">
          <img src="${productRetrieved.images[0]}" style="height: 100px; object-fit: contain;">
        </div>
        <div class="col-5">
          <h5 class =""> ${productRetrieved.title}</h5>
        </div>
        <div class="col-3 text-end">
          <h5 class ="card-text mt-auto">${productRetrieved.price} USD</h5>
        </div>
        <div class="col-2">
        <h5> nr: <a id=amount_of_product>${shoppingCartList[id].amount}</a> </h5> 
          <div class="d-flex justify-content-end gap-1 mt-2">
            <button class="minusButton quantity_button">-</button>
            <button class="plusButton quantity_button">+</button>
            <button style="background-color: red;" class="deleteButton quantity_button">✕</button>
          </div>
        </div>
      </div>

      `;

      container.appendChild(div);
    }
  }
}

//MINUS BUTTON
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("minusButton")) {
    const id = e.target.closest("[data-product-id]").dataset.productId;
    decreaseFromCart(id);
    updateShoppingCart();
  }
});
//PLUS BUTTON
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("plusButton")) {
    const id = e.target.closest("[data-product-id]").dataset.productId;
    addToCart(id);
    updateShoppingCart();
  }
});
//DELETE BUTTON
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteButton")) {
    const id = e.target.closest("[data-product-id]").dataset.productId;
    removeFromCart(id);
    updateShoppingCart();
  }
});

async function getSingleProduct(id) {
  const fetchedData = await fetch(`https://dummyjson.com/products/${id}`);
  const jsonData = fetchedData.json();
  return jsonData;
}
