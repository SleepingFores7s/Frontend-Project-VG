document.addEventListener("DOMContentLoaded", updateShoppingCart);

async function updateShoppingCart() {
  const shoppingCartList = JSON.parse(localStorage.getItem("cart")) || [];

  if (shoppingCartList.length === 0) {
    document.getElementById("products").innerText =
      "Your Shopping Cart is empty";
  } else {
    console.log(shoppingCartList);
    console.log(JSON.parse(localStorage.getItem("cart")));
    for (const product of shoppingCartList) {
      const productRetrieved = await getSingleProduct(product);

      const container = document.getElementById("products");

      const div = document.createElement("div");
      div.className = "row";
      div.innerHTML = `
      <div class="row align-items-center">
        <div class="col-3">
          <img src="${productRetrieved.images[0]}" style="height: 100px; object-fit: contain;">
        </div>
        <div class="col-6">
          <h5 class =""> ${productRetrieved.title}</h5>
        </div>
        <div class="col-3 text-end">
          <h5 class ="card-text mt-auto">${productRetrieved.price} USD</h5>
          <div class="d-flex justify-content-end gap-2 mt-2">
            <button class="quantity_button">-</button>
            <button class="quantity_button">+</button>
          </div>
        </div>
      </div>

      `;

      container.appendChild(div);
    }
  }
}

async function getSingleProduct(id_number) {
  const fetchedData = await fetch(
    `https://dummyjson.com/products/${id_number}`,
  );
  const jsonData = fetchedData.json();
  return jsonData;
}
