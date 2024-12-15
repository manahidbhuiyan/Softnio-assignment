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

  // Initialize the main price based on the active size
  const updateMainPrice = (price) => {
    mainPrice.textContent = `$${Number(price).toFixed(2)}`;
  };

    // Set default active price
    const activeButton = document.querySelector(".size-option.active-size");
    if (activeButton) {
      updateMainPrice(activeButton.dataset.price);
    }

sizeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
     // Remove active class from all buttons
     sizeButtons.forEach((btn) => btn.classList.remove("active-size"));

     // Add active class to the clicked button
     button.classList.add("active-size");

     // Update price based on the clicked button
     const price = button.dataset.price;
     updateMainPrice(price);
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
