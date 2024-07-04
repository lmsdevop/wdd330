import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  const totalPrice = getTotalCart(cartItems);
  const htmlTotal = document.querySelector('.cart-total');
  htmlTotal.innerHTML = `Total: $${totalPrice}`;

  document.querySelectorAll('.cart-remove').forEach(button => {
    button.addEventListener('click', () => removeItem(button.dataset.id));
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-remove" id="removeItem" data-id=${item.Id}>X</span>

</li>`;

  return newItem;
}

function getTotalCart(itens) {
    let total = 0;
    itens.forEach(item => {
      total += item.FinalPrice;
    });
    return total;
} 

function removeItem(id) {
  let items = getLocalStorage("so-cart") || [];
  const index = items.findIndex(item => item.Id === id);
  
  if (index !== -1) {
    items.splice(index, 1);
    localStorage.setItem("so-cart", JSON.stringify(items));
    renderCartContents();
  }
}

renderCartContents();