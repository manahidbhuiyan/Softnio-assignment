// Product data
const productData = {
  title: "Classy Modern Smart Watch",
  type: "Smartwatch",
  modelNumber: "SW12345",
  description: "I must explain to you how all this mistaken idea of denoun cing ple praising pain was born and I will give you a complete account of the system, and expound the actual teaching.",
  oldPrice: 99.00,
  price: 69.00,
  star: 3.5,
  reviews: 2,
  image: "./src/assets/images/product-gallery/purple.png",
  colors: [
    { name: "purple", image: "./src/assets/images/product-gallery/purple.png", color: '#816BFF' },
    { name: "cyan", image: "./src/assets/images/product-gallery/cyan.png", color: '#1FCEC9' },
    { name: "blue", image: "./src/assets/images/product-gallery/blue.png", color: '#4B97D3' },
    { name: "black", image: "./src/assets/images/product-gallery/black.png", color: '#3B4747' },
  ],
  sizes: [
    { name: "S", price: 69.00, previusPrice: 89.00 },
    { name: "M", price: 79.00, previusPrice: 99.00 },
    { name: "L", price: 89.00, previusPrice: 109.00 },
    { name: "XL", price: 99.00, previusPrice: 119.00 }
  ],
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// product details
document.getElementById("product-title").textContent = productData.title;
document.getElementById("product-type").textContent = productData.type;
document.getElementById("model-number").textContent = productData.modelNumber;
document.getElementById("description").textContent = productData.description;
document.getElementById("old-price").textContent = `$${productData.oldPrice.toFixed(2)}`;
document.getElementById("main-price").textContent = `$${productData.price.toFixed(2)}`;
document.getElementById("main-image").src = productData.colors[0].image;

// review stars
const reviewsContainer = document.getElementById("reviews");

const renderStars = (rating, reviewCount) => {
  const fullStar = '<img src="./src/assets/images/star/star-fill.png" alt="full-star" class="w-[18px] h-[18px]">';
  const halfStar = '<img src="./src/assets/images/star/star-half-fill.png" alt="half-star" class="w-[18px] h-[18px]">';
  const blankStar = '<img src="./src/assets/images/star/star.png" alt="blank-star" class="w-[18px] h-[18px]">';

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const blankStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starsHTML = `
  ${fullStar.repeat(fullStars)}
  ${hasHalfStar ? halfStar : ""}
  ${blankStar.repeat(blankStars)}
  <span class="star-text text-sm leading-23 font-normal text-blue-gray">( ${reviewCount} Reviews)</span>
`;
reviewsContainer.innerHTML = starsHTML;

};
renderStars(productData.star, productData.reviews);

// Color Selection
const colorPicker = document.getElementById("color-picker");
let selectedColor = productData.colors[0].name;

productData.colors.forEach((color, index) => {
  const colorDiv = document.createElement("div");
  colorDiv.classList.add("color-circle");
  colorDiv.style.backgroundColor = color.color;
  if (index === 0) {
    colorDiv.classList.add("ring-2", "ring-offset-2");
    colorDiv.style.setProperty('--tw-ring-color', color.color);
  }

  colorDiv.addEventListener("click", () => {
    selectedColor = color.name;
    document.getElementById("main-image").src = color.image;

    document.querySelectorAll(".color-circle").forEach(item => {
      item.classList.remove("ring-2", "ring-offset-2");
    });
    colorDiv.classList.add("ring-2", "ring-offset-2");
    colorDiv.style.setProperty('--tw-ring-color', color.color);
  });
  colorPicker.appendChild(colorDiv);
});



// Size Selection
const sizeOptions = document.getElementById("size-options");
let selectedSize = productData.sizes[1].name;

productData.sizes.forEach((size, index) => {
  const sizeOptionDiv = document.createElement("div");
  sizeOptionDiv.classList.add("size-option");
  sizeOptionDiv.dataset.price = size.price;
  sizeOptionDiv.dataset.prevPrice = size.previusPrice;

  const sizeName = document.createElement("span");
  sizeName.classList.add("size-name");
  sizeName.textContent = size.name;

  const sizePrice = document.createElement("span");
  sizePrice.classList.add("size-price");
  sizePrice.textContent = '$' + size.price.toFixed(0);

  sizeOptionDiv.appendChild(sizeName);
  sizeOptionDiv.appendChild(sizePrice);

  if (index === 1) {
    selectedSize = size.name;
    sizeOptionDiv.classList.add("active-size");
    sizeName.classList.add("text-blue-shade");
    document.getElementById("main-price").textContent = `$${size.price.toFixed(2)}`;
  }

  sizeOptionDiv.addEventListener("click", () => {
    selectedSize = size.name;

    document.querySelectorAll(".size-option").forEach(item => {
      item.classList.remove("active-size");
      item.querySelector(".size-name").classList.remove("text-blue-shade");
    });

    sizeOptionDiv.classList.add("active-size");
    sizeName.classList.add("text-blue-shade");
    document.getElementById("main-price").textContent = `$${size.price.toFixed(2)}`;
  });

  sizeOptions.appendChild(sizeOptionDiv);
});

// Quantity management
let quantity = 0;
const quantityDisplay = document.getElementById("quantity-display");
const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");

increaseButton.addEventListener("click", () => {
  quantity++;
  quantityDisplay.textContent = quantity;
});

decreaseButton.addEventListener("click", () => {
  if (quantity > 0) {
    quantity--;
    quantityDisplay.textContent = quantity;
  }
});

// Add to cart
const addToCartButton = document.getElementById("add-to-cart");
const checkoutButton = document.getElementById("checkout-button");
const cartCount = document.getElementById("cart-count");

const updateCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.textContent = cart.length;
  checkoutButton.style.display = cart.length > 0 ? "flex" : "none";
};

addToCartButton.addEventListener("click", () => {
  if(quantity > 0){
    const existingItem = cart.find(item => item.color === selectedColor && item.size === selectedSize);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        name: productData.title,
        color: selectedColor,
        size: selectedSize,
        price: productData.sizes.find(s => s.name === selectedSize).price,
        quantity: quantity,
        thumbnail: productData.colors.find(c => c.name === selectedColor).image,
      });
    }
    quantity = 0;
    quantityDisplay.textContent = quantity;
    updateCart();
  }else{
    alert("You need to add minimum 1 quantity")
  }
});

// Show checkout modal
const checkoutModal = document.getElementById("checkout-modal");

checkoutButton.addEventListener("click", () => {
  checkoutModal.classList.remove("hidden");
  checkoutModal.classList.add("flex");

  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  cart.forEach(item => {
    const row = document.createElement("tr");
    row.classList.add("border-b", "border-soft-gray");

    row.innerHTML = `
      <td class="flex items-center gap-2 py-4">
        <div class="w-9 h-9"><img src="${item.thumbnail}" alt="${item.name}"></div>
        <div class="column-title">${item.name}</div>
      </td>
      <td class="font-normal column-text">${item.color}</td>
      <td class="font-bold column-text">${item.size}</td>
      <td class="font-bold column-text">${item.quantity}</td>
      <td class="font-bold text-[14px] text-right text-dark-slate-blue py-4">$${(item.price * item.quantity).toFixed(2)}</td>
    `;
    cartItems.appendChild(row);
  });

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  document.getElementById("total-qty").textContent = totalQty;
  document.getElementById("total-price").textContent = `$${totalPrice.toFixed(2)}`;
});

// Hide checkout modal
const hideCheckoutButton = document.querySelector(".bg-white.border");

hideCheckoutButton.addEventListener("click", () => {
  checkoutModal.classList.add("hidden");
  checkoutModal.classList.remove("flex");
});

// Initial setup
updateCart();
