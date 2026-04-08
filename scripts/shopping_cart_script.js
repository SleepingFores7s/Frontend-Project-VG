import {
  addToCart,
  decreaseFromCart,
  loadCart,
  removeFromCart,
  getSingleProduct,
} from "./local_data_handling.js";

document.addEventListener("DOMContentLoaded", () => {
  updateShoppingCart();
  updatePricetag();
});

async function updateShoppingCart() {
  const shoppingCartList = loadCart();

  const container = document.getElementById("products");
  container.innerHTML = "";

  if (Object.keys(shoppingCartList).length === 0) {
    document.getElementById("products").innerText = "Your Cart is empty";
  } else {
    console.log(shoppingCartList);
    console.log(JSON.parse(localStorage.getItem("cart")));
    for (const id in shoppingCartList) {
      const productRetrieved = await getSingleProduct(id); ///---------------------

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
        <h5> total: <a id=amount_of_product>${shoppingCartList[id].amount}</a> </h5> 
          <div class="d-flex justify-content-end gap-1 mt-2">
            <button type="button" class="minusButton quantity_button">-</button>
            <button type="button" class="plusButton quantity_button">+</button>
            <button type="button" style="background-color: red;" class="deleteButton quantity_button">✕</button>
          </div>
        </div>
      </div>

      `;

      container.appendChild(div);
    }
  }
}

document.addEventListener("click", (e) => {
  const target = e.target;

  switch (true) {
    //BUY BUTTON
    case target.classList.contains("buy_cart_button"):
      //Make call to form, send id/name of all products to form
      if (Object.keys(loadCart()).length === 0) {
        break;
      }
      window.location.href = "html/order-form.html";
      break;
    //EMPTY CART BUTTON
    case target.classList.contains("empty_cart_button"):
      localStorage.removeItem("cart");
      updateShoppingCart();
      updatePricetag();
      break;

    //PLUS BUTTON
    case target.classList.contains("plusButton"): {
      const id = target.closest("[data-product-id]").dataset.productId;
      addToCart(id);
      updateShoppingCart();
      updatePricetag();
      break;
    }

    //MINUS BUTTON
    case target.classList.contains("minusButton"): {
      const id = target.closest("[data-product-id]").dataset.productId;
      decreaseFromCart(id);
      updateShoppingCart();
      updatePricetag();
      break;
    }

    //DELETE BUTTON
    case target.classList.contains("deleteButton"): {
      const id = target.closest("[data-product-id]").dataset.productId;
      removeFromCart(id);
      updateShoppingCart();
      updatePricetag();
      break;
    }

    default:
      // Click was not on any cart button
      break;
  }
});

async function updatePricetag() {
  const shoppingCartList = loadCart();
  let totalCost = 0;

  for (const id in shoppingCartList) {
    const product = await getSingleProduct(id); //-----------------------
    totalCost += product.price * shoppingCartList[id].amount;
  }

  document.getElementById("total_cost_text_price").innerText =
    `$${totalCost.toFixed(2)}`;
}
