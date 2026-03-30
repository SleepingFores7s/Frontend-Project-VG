const menuItems = [
  { name: "Start Page", url: "/Frontend-Projektarbete-G-niva/index.html" },
  { name: "Order", url: "/Frontend-Projektarbete-G-niva/html/order-form.html" },
  { name: "About Us", url: "/Frontend-Projektarbete-G-niva/html/about-us.html" },
];

const div = document.createElement("div");
div.className = "menu-bar-bottom";

let html = '<div class="menu-bar-bottom-sub-box">';

menuItems.forEach((item) => {
  html += `<a class="bottom-links" href="${item.url}">${item.name}</a>`;
});

html += "</div>";

div.innerHTML = html;
document.body.appendChild(div);
