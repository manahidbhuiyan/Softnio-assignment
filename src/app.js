// Color Selection
const colorCircles = document.querySelectorAll(".color-circle");
const images = document.querySelectorAll(".image-gallery img");

colorCircles.forEach((circle) => {
    console.log("circle")
    circle.addEventListener("click", (e) => {
        // Remove active class
        colorCircles.forEach((item) => item.classList.remove("ring-2", "ring-offset-2"));

        // Add active class to clicked
        e.target.classList.add("ring-2", "ring-offset-2");
        const colorName = e.target.dataset.image;
        console.log("colorName",colorName)

        // Show relevant image
        images.forEach((img) => {
            img.classList.toggle("active-image", img.alt.includes(colorName));
        });
    });
});

// Size Selection
const sizeButtons = document.querySelectorAll(".size-option");
const mainPrice = document.getElementById("main-price");

sizeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        // Remove active class
        sizeButtons.forEach((btn) => btn.classList.remove("active-size"));

        // Add active class to selected button
        const selectedSize = e.target;
        selectedSize.classList.add("active-size");

        // Update price
        const price = selectedSize.dataset.price;
        mainPrice.textContent = `$${price}`;
    });
});