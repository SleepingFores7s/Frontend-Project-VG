fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(products => {
    console.log(products); 
    const container = document.getElementById('products');

    products.forEach(product => {
      const div = document.createElement('div');
      div.className = 'col';
      div.innerHTML = `
       <div class="card h-100 text-center">
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
        const img = div.querySelector('.product-img');
        img.addEventListener('mouseover', () => {
          img.style.transform = 'scale(1.1)';
        });
        img.addEventListener('mouseout', () => {
          img.style.transform = 'scale(1)';
        });

        // order button hover effect
        const orderButton = div.querySelector('.order-button');
        orderButton.addEventListener('mouseover', () => {
          orderButton.style.backgroundColor = '#0056b3';
          orderButton.transform = 'scale(1.05)';
        });
        orderButton.addEventListener('mouseout', () => {
          orderButton.style.backgroundColor = '#007bff';
          orderButton.transform = 'scale(1)';
        });
      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Something went wrong:', error);
  });

function orderProduct(id) {
  alert(`You ordered product with id: ${id}`);
}