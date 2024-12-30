document.addEventListener("DOMContentLoaded", () => {
    // Ensure necessary DOM elements exist
    const cartCount = document.getElementById("cart-count");
    const cartButton = document.getElementById("cart-button");
    const productList = document.querySelector(".product-list");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const contactForm = document.getElementById("contact-form");
    const profileDetails = document.getElementById("profile-details");

    if (!cartCount || !cartButton || !productList || !contactForm || !profileDetails|| !searchInput || !searchButton) {
        console.error("Required DOM elements are missing. Please check your HTML.");
        return;
    }

    // Cart dropdown initialization
    const cartDropdown = document.createElement("div");
    cartDropdown.id = "cart-dropdown";
    cartDropdown.style.display = "none"; // Initially hidden
    document.body.appendChild(cartDropdown);

    let cartItems = []; // Array to store items added to the cart

    // Function to update the cart count
    function updateCartCount() {
        cartCount.textContent = cartItems.length;
    }

    // Function to render the cart dropdown
    function renderCartDropdown() {
        cartDropdown.innerHTML = ""; // Clear existing items

        if (cartItems.length === 0) {
            cartDropdown.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        const cartList = document.createElement("ul");
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement("li");
            cartItem.innerHTML = `
                ${item.name} - $${item.price}
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartList.appendChild(cartItem);
        });

        cartDropdown.appendChild(cartList);

        // Add event listeners for the remove buttons
        document.querySelectorAll(".remove-from-cart").forEach((button) => {
            button.addEventListener("click", (event) => {
                const index = event.target.dataset.index;
                cartItems.splice(index, 1); // Remove item from cart
                updateCartCount();
                renderCartDropdown();
            });
        });
    }

    // Toggle the cart dropdown visibility
    cartButton.addEventListener("click", () => {
        cartDropdown.style.display = cartDropdown.style.display === "block" ? "none" : "block";
    });

    // Function to render products
    function renderProducts(filteredProducts = products) {
        productList.innerHTML = ""; // Clear existing content

        if (filteredProducts.length === 0) {
            productList.innerHTML = "<p>No products found.</p>";
            return;
        }

        filteredProducts.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.dataset.id = product.id;

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image" />
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button class="buy-now">Buy Now</button>
                <button class="add-to-cart">Add to Cart</button>
            `;

             // Add click event listener to entire card
            productCard.addEventListener("click", () => {
            window.location.href = `./product-details.html?id=${product.id}`;
            });

            // Add-to-Cart Button
            productCard.querySelector(".add-to-cart").addEventListener("click", (event) => {
                event.stopPropagation();
                cartItems.push(product); // Add product to cart
                updateCartCount();
                renderCartDropdown();
            });

            // Buy Now Button

            productCard.querySelector(".buy-now").addEventListener("click", (event) => {
                event.stopPropagation();
                window.location.href = `./product-details.html?id=${product.id}`;
            });

            productList.appendChild(productCard);
        });
    }

    // Contact form handling
    const profiles = JSON.parse(localStorage.getItem("profiles")) || [];
    const profileSelect = document.createElement("select");
    profileSelect.id = "profile-select";
    profileDetails.parentElement.insertBefore(profileSelect, profileDetails);

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (name && email && message) {
            const newProfile = { name, email, message };
            profiles.push(newProfile);
            localStorage.setItem("profiles", JSON.stringify(profiles));

            alert(`Thank you, ${name}! Your message has been saved.`);
            contactForm.reset();
            updateProfileDropdown();
        } else {
            alert("Please fill out all fields before submitting.");
        }
    });

    function updateProfileDropdown() {
        profileSelect.innerHTML = ""; // Clear dropdown
        profiles.forEach((profile, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = profile.name;
            profileSelect.appendChild(option);
        });

        // Load selected profile on change
        profileSelect.addEventListener("change", () => {
            const selectedIndex = profileSelect.value;
            const selectedProfile = profiles[selectedIndex];

            if (selectedProfile) {
                document.getElementById("profile-name").textContent = selectedProfile.name;
                document.getElementById("profile-email").textContent = selectedProfile.email;
                document.getElementById("profile-message").textContent = selectedProfile.message;
            }
        });
    }
    // Function to update the cart count
    function updateCartCount() {
        cartCount.textContent = cartItems.length;
    }

    // Function to filter products based on search query
    function filterProducts(query) {
        return products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
    }

  // Search functionality
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    const filteredProducts = filterProducts(query);
    renderProducts(filteredProducts);

    // Scroll to the products section
    const productsSection = document.getElementById("products");
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
    }
});

searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const query = searchInput.value.trim();
        const filteredProducts = filterProducts(query);
        renderProducts(filteredProducts);

        // Scroll to the products section
        const productsSection = document.getElementById("products");
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: "smooth" });
        }
    }
});


    // Initialize
    updateCartCount();
    renderProducts();
    updateCartCount();
    renderCartDropdown();
    renderProducts();
    updateProfileDropdown();
});

// Product Data
// const products = [
//     { id: 1, name: "Brake Pads", price: 50 },
//     { id: 2, name: "Wheel Covers", price: 25 },
//     { id: 3, name: "Mirror", price: 60 },
//     { id: 4, name: "Engine Oil", price: 30 },
// ];
// Product Data
const products = [
    { id: 1, name: "Brake Pads", price: 50, image: "placeholder.jpg" },
    { id: 2, name: "Wheel Covers", price: 25, image: "placeholder.jpg" },
    { id: 3, name: "Mirror", price: 60, image: "placeholder.jpg" },
    { id: 4, name: "Engine Oil", price: 30, image: "placeholder.jpg" },
];
//! SLIDE FUNCTIONALITY
const heroImages = document.querySelector('.hero-images');
const images = document.querySelectorAll('.hero-images img');
let currentImageIndex = 0;

function showSlide(index) {
    if (index < 0) {
        index = images.length - 1; // Go to the last image
    } else if (index >= images.length) {
        index = 0; // Go to the first image
    }

    heroImages.style.transform = `translateX(-${index * 100}%)`;
    currentImageIndex = index;
}

function nextSlide() {
    showSlide(currentImageIndex + 1);
}

function prevSlide() {
    showSlide(currentImageIndex - 1);
}

// Optional: Auto-slide
setInterval(nextSlide, 3000); // Change slide every 3 seconds
