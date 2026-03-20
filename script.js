fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(products => {
    console.log(products); 
    const container = document.getElementById('products');

    products.forEach(product => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.image}" width="100">
        <p>${product.price} USD</p>
        <button onclick="orderProduct(${product.id})">Order</button>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Something went wrong:', error);
  });

function orderProduct(id) {
  alert(`You ordered product with id: ${id}`);
}