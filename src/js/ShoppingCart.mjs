import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.qty}</p>
  <p class="cart-card__price">$${(item.FinalPrice * item.qty).toFixed(2)}</p>
</li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }

  async init() {
    const list = getLocalStorage(this.key) || [];
    this.calculateListTotal(list);
    this.renderCartContents(list);
  }

  addToCart(item) {
    let list = getLocalStorage(this.key) || [];
    const existingItem = list.find(cartItem => cartItem.Id === item.Id);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      item.qty = 1;
      list.push(item);
    }

    setLocalStorage(this.key, list);
    this.calculateListTotal(list);
    this.renderCartContents(list);
  }

  calculateListTotal(list) {
    this.total = list.reduce((sum, item) => sum + (item.FinalPrice * item.qty), 0);
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key) || [];
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    document.querySelector(".list-total").innerText = `Total: $${this.total.toFixed(2)}`;
  }
}