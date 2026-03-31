fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((products) => {
    console.log(products);
    const container = document.getElementById("products");

    products.forEach((product) => {
      const div = document.createElement("div");
      div.className = "col";
      div.innerHTML = `
       <div class="card h-100 text-center bg-light">
       <img src="${product.image}" class="card-img-top p-3 product-img"  style="height: 200px; object-fit: contain;
       transition: transform 0.3s;">
       <div class="card-body d-flex flex-column"> 
       <h5 class ="card-title"> ${product.title}</h5>
    
        <p class ="card-text mt-auto">${product.price} USD</p>
        <button class="btn btn-primary order-button">Order</button>
        </div>
        </div>

      `;

      // image hover effect
      const img = div.querySelector(".product-img");
      img.addEventListener("mouseover", () => {
        img.style.transform = "scale(1.1)";
      });
      img.addEventListener("mouseout", () => {
        img.style.transform = "scale(1)";
      });

      // order button hover effect
      const orderButton = div.querySelector(".order-button");
      orderButton.addEventListener("mouseover", () => {
        orderButton.style.backgroundColor = "#0056b3";
        orderButton.style.transform = "scale(1.05)";
      });
      orderButton.addEventListener("mouseout", () => {
        orderButton.style.backgroundColor = "#007bff";
        orderButton.style.transform = "scale(1)";
      });

      orderButton.addEventListener("click", () => {
        window.location.href = `HTML/order-form.html`;
        //Pass the product id to the order form page
        localStorage.setItem("selectedProductId", product.id);
        localStorage.setItem("selectedProductName", product.title);
      });

      container.appendChild(div);
    });
  })
  .catch((error) => {
    console.error("Something went wrong:", error);
  });

function orderProduct(id) {
  alert(`You ordered product with id: ${id}`);
}

function formValidation() {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const tel = document.querySelector("#tel");
    const streetAddress = document.querySelector("#street-address");
    const postalCode = document.querySelector("#postal-code");
    const city = document.querySelector("#city");

    let isValid = true; // Assume form is valid until proven otherwise

    // Name validation
    if (name.value.length < 2 || name.value.length > 50) {
      name.classList.add("is-invalid");
      name.classList.remove("is-valid");
      isValid = false;
    } else {
      name.classList.add("is-valid");
      name.classList.remove("is-invalid");
    }

    // Email validation
    if (
      !email.value.includes("@") ||
      email.value.length > 50 ||
      email.value.length === 0
    ) {
      email.classList.add("is-invalid");
      email.classList.remove("is-valid");
      isValid = false;
    } else {
      email.classList.add("is-valid");
      email.classList.remove("is-invalid");
    }

    // Telephone validation
    const telRegex = /^[0-9\-\(\)]{1,20}$/;
    if (!telRegex.test(tel.value)) {
      tel.classList.add("is-invalid");
      tel.classList.remove("is-valid");
      isValid = false;
    } else {
      tel.classList.add("is-valid");
      tel.classList.remove("is-invalid");
    }

    // Street address validation
    if (
      streetAddress.value.length < 2 ||
      streetAddress.value.length > 50 ||
      streetAddress.value.length === 0
    ) {
      streetAddress.classList.add("is-invalid");
      streetAddress.classList.remove("is-valid");
      isValid = false;
    } else {
      streetAddress.classList.add("is-valid");
      streetAddress.classList.remove("is-invalid");
    }

    // Postal code validation
    const postalCodeRegex = /^[0-9]{5}$/;
    if (!postalCodeRegex.test(postalCode.value)) {
      postalCode.classList.add("is-invalid");
      postalCode.classList.remove("is-valid");
      isValid = false;
    } else {
      postalCode.classList.add("is-valid");
      postalCode.classList.remove("is-invalid");
    }

    // City validation
    if (city.value.length < 2 || city.value.length > 20) {
      city.classList.add("is-invalid");
      city.classList.remove("is-valid");
      isValid = false;
    } else {
      city.classList.add("is-valid");
      city.classList.remove("is-invalid");
    }

    if (isValid) {
      alert("Your order has been placed successfully! "
      + "\nProduct: " + savedProductName
      + "\nName: " + name.value
      + "\nEmail: " + email.value
      + "\nTelephone: " + tel.value 
      + "\nStreet Address: " + streetAddress.value
      + "\nPostal Code: " + postalCode.value
      + "\nCity: " + city.value);
      form.reset();
    }
    if (!isValid) {
      alert("Please correct the errors in the form before submitting.");
    }
  });
}

const savedProductId = localStorage.getItem("selectedProductId");
if (savedProductId) {
  document.getElementById("product").value = savedProductId;
}
const savedProductName = localStorage.getItem("selectedProductName");
if (savedProductName) {
  document.getElementById("product-name").textContent = savedProductName;
}

formValidation();