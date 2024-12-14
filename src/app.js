// Color Selection
const colorCircles = document.querySelectorAll(".color-circle");
const images = document.querySelectorAll(".image-gallery img");

colorCircles.forEach((circle) => {
  circle.addEventListener("click", (e) => {
    colorCircles.forEach((item) =>
      item.classList.remove("ring-2", "ring-offset-2")
    );

    e.target.classList.add("ring-2", "ring-offset-2");
    const colorName = e.target.dataset.image;

    images.forEach((img) => {
      img.classList.toggle("active-image", img.alt.includes(colorName));
    });
  });
});

// size wise price change
const sizeButtons = document.querySelectorAll(".size-option");
const mainPrice = document.getElementById("main-price");

sizeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    sizeButtons.forEach((btn) => btn.classList.remove("active-size"));

    const selectedSize = e.target;
    selectedSize.classList.add("active-size");

    const price = Number(parseFloat(selectedSize.dataset.price).toFixed(2));
    mainPrice.textContent = `$${price}`;
  });
});

// modal on off
const checkoutButton = document.getElementById("checkout-button");
const checkoutModal = document.getElementById("checkout-modal");
const body = document.body;

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

function showCheckout() {
  const scrollbarWidth = getScrollbarWidth() + 20;

  body.style.paddingRight = `${scrollbarWidth}px`;
  body.style.overflow = "hidden";

  checkoutButton.classList.add("hidden");
  checkoutModal.classList.remove("hidden");
  checkoutModal.classList.add("flex");
}

function hideCheckout() {
  body.style.paddingRight = "";
  body.style.overflow = "";

  checkoutModal.classList.add("hidden");
  checkoutButton.classList.remove("hidden");
  checkoutButton.classList.add("flex");
}
