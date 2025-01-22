// document.addEventListener('DOMContentLoaded', () => {
//     const logoutButton = document.getElementById('logout-button');
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     const isLoginPage = window.location.pathname.includes('login.html');

//     // Redirect to login page if not logged in
//     // if (!currentUser && !isLoginPage) {
//     //     window.location.href = './login.html';
//     //     return;
//     // }

//     // Logout button functionality
//     if (logoutButton) {
//         logoutButton.addEventListener('click', () => {
//             localStorage.removeItem('currentUser'); // Clear user session
//             window.location.href = './login.html'; // Redirect to login page
//         });
//     }

//     // Prevent navigating back to home page after logout
//     if (isLoginPage && !currentUser) {
//         window.history.pushState(null, '', './login.html'); // Replace state to prevent back navigation
//         window.onpopstate = () => {
//             window.history.pushState(null, '', './login.html'); // Redirect back to login
//         };
//     }

//     // // Display logged-in user's details in the profile section
//     // const profileName = document.getElementById('profile-name');
//     // const profileEmail = document.getElementById('profile-email');
//     // const profileMessage = document.getElementById('profile-message');

//     // if (currentUser && profileName && profileEmail && profileMessage) {
//     //     profileName.textContent = currentUser.name || "N/A";
//     //     profileEmail.textContent = currentUser.email || "N/A";
//     //     profileMessage.textContent = currentUser.message || "No message provided.";
//     // }

//     // Ensure necessary DOM elements exist
//     const cartCount = document.getElementById("cart-count");
//     const cartButton = document.getElementById("cart-button");
//     const cartDrawer = document.getElementById("cart-drawer");
//     const cartItemsContainer = document.getElementById("cart-items-container");
//     const closeCartDrawerButton = document.getElementById("close-cart-drawer");
//     const productList = document.querySelector(".product-list");
//     const searchInput = document.getElementById("search-input");
//     const searchButton = document.getElementById("search-button");
//     const contactForm = document.getElementById("contact-form");
//     const profileDetails = document.getElementById("profile-details");
    
//     if (!cartCount || !cartButton || !productList || !contactForm || !profileDetails || !searchInput || !searchButton) {
//         console.error("Required DOM elements are missing. Please check your HTML.");
//         return;
//     }
    
//     let cartItems = []; // Array to store items added to the cart
    
//     // Function to update the cart count
//     function updateCartCount() {
//         cartCount.textContent = cartItems.length;
//     }
    
//     // Function to render the cart drawer
//     function renderCartDrawer() {
//         cartItemsContainer.innerHTML = ""; // Clear existing items
    
//         if (cartItems.length === 0) {
//             cartItemsContainer.innerHTML = `
//             <div id="empty-cart-content">
//             <p>Your AutoMobileWorld cart is empty!</p>
//                 <img src="./cart-empty.jpg" alt="Empty Cart" class="empty-cart-image" />
//                 <p>Check out some of our popular products:</p>
//                 <button id="browse-products" class="browse-products-button">Browse Products</button>
//             </div>
//         `;
    
//         // Add event listener for the "Browse Products" button
//         document.getElementById("browse-products").addEventListener("click", () => {
//             const productsSection = document.getElementById("products");
//             if (productsSection) {
//                 productsSection.scrollIntoView({ behavior: "smooth" });
//             }
//         });
//             return;
//         }
    
//         cartItems.forEach((item, index) => {
//             const cartItem = document.createElement("div");
//             cartItem.classList.add("cart-item");
    
//             cartItem.innerHTML = `
//                 <div class="cart-item-details">
//                     <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
//                     <div>
//                         <p>${item.name}</p>
//                         <p>Price: $${item.price}</p>
//                     </div>
//                 </div>
//                 <div class="cart-item-actions">
//                     <button class="remove-from-cart" data-index="${index}">Remove</button>
//                     <button class="buy-now" data-id="${item.id}">Buy Now</button>
//                 </div>
//             `;
    
//             cartItemsContainer.appendChild(cartItem);
//         });
    
//         // Add event listeners for the remove buttons
//         document.querySelectorAll(".remove-from-cart").forEach((button) => {
//             button.addEventListener("click", (event) => {
//                 const index = event.target.dataset.index;
//                 cartItems.splice(index, 1); // Remove item from cart
//                 updateCartCount();
//                 renderCartDrawer();
//             });
//         });
    
//         // Add event listeners for the Buy Now buttons
//         document.querySelectorAll(".buy-now").forEach((button) => {
//             button.addEventListener("click", (event) => {
//                 const productId = event.target.dataset.id;
//                 window.location.href = `./product-details.html?id=${productId}`;
//             });
//         });
//     }
    
//     // Function to open the cart drawer
//     function openCartDrawer() {
//         cartDrawer.classList.add("open");
//     }
    
//     // Function to close the cart drawer
//     function closeCartDrawer() {
//         cartDrawer.classList.remove("open");
//     }
    
//     // Event listener for opening and closing the drawer
//     cartButton.addEventListener("click", openCartDrawer);
//     closeCartDrawerButton.addEventListener("click", closeCartDrawer);
    
//     // Function to render products
//     function renderProducts(filteredProducts = products) {
//         productList.innerHTML = ""; // Clear existing content
    
//         if (cartItems.length === 0) {
//             cartItemsContainer.innerHTML = `
//                 <div id="empty-cart-content">
//                 <p>Your AutoMobileWorld cart is empty!</p>
//                     <img src="./cart-empty.jpg" alt="Empty Cart" class="empty-cart-image" />
//                        <p>Check out some of our popular products:</p>
//                     <button id="browse-products" class="browse-products-button">Browse Products</button>
//                 </div>
//             `;
        
//             // Add event listener for the "Browse Products" button
//             document.getElementById("browse-products").addEventListener("click", () => {
//                 const productsSection = document.getElementById("products");
//                 if (productsSection) {
//                     productsSection.scrollIntoView({ behavior: "smooth" });
//                 }
//             });
//         }
    
//         filteredProducts.forEach((product) => {
//             const productCard = document.createElement("div");
//             productCard.classList.add("product-card");
    
//             productCard.innerHTML = `
//                 <div>
//                     <img src="${product.image}" alt="${product.name}" class="product-image" />
//                     <h3>${product.name}</h3>
//                     <p>Price: $${product.price}</p>
//                     <button class="buy-now">Buy Now</button>
//                     <button class="add-to-cart">Add to Cart</button>
//                 </div>
//             `;
//                // Add click event listener to entire card
//             productCard.addEventListener("click", () => {
//                 window.location.href = `./product-details.html?id=${product.id}`;
//                 });
//             // Add-to-Cart Button
//             productCard.querySelector(".add-to-cart").addEventListener("click", (event) => {
//                 event.stopPropagation();
//                 cartItems.push(product); // Add product to cart
//                 updateCartCount();
//                 renderCartDrawer();
//             });
    
//             // Buy Now Button
//             productCard.querySelector(".buy-now").addEventListener("click", (event) => {
//                 event.stopPropagation();
//                 window.location.href = `./product-details.html?id=${product.id}`;
//             });
    
//             productList.appendChild(productCard);
//         });
//     }
    

//     // Contact form handling
//     const profiles = JSON.parse(localStorage.getItem("profiles")) || [];
//     const profileSelect = document.createElement("select");
//     profileSelect.id = "profile-select";
//     profileDetails.parentElement.insertBefore(profileSelect, profileDetails);

//     contactForm.addEventListener("submit", (event) => {
//         event.preventDefault(); // Prevent default form submission

//         const name = document.getElementById("name").value;
//         const email = document.getElementById("email").value;
//         const message = document.getElementById("message").value;

//         if (name && email && message) {
//             const newProfile = { name, email, message };
//             profiles.push(newProfile);
//             localStorage.setItem("profiles", JSON.stringify(profiles));

//             alert(`Thank you, ${name}! Your message has been saved.`);
//             contactForm.reset();
//             updateProfileDropdown();
//         } else {
//             alert("Please fill out all fields before submitting.");
//         }
//     });

//     function updateProfileDropdown() {
//         profileSelect.innerHTML = ""; // Clear dropdown
//         profiles.forEach((profile, index) => {
//             const option = document.createElement("option");
//             option.value = index;
//             option.textContent = profile.name;
//             profileSelect.appendChild(option);
//         });

//         // Load selected profile on change
//         profileSelect.addEventListener("change", () => {
//             const selectedIndex = profileSelect.value;
//             const selectedProfile = profiles[selectedIndex];

//             if (selectedProfile) {
//                 document.getElementById("profile-name").textContent = selectedProfile.name;
//                 document.getElementById("profile-email").textContent = selectedProfile.email;
//                 document.getElementById("profile-message").textContent = selectedProfile.message;
//             }
//         });
//     }
//     // Function to update the cart count
//     function updateCartCount() {
//         cartCount.textContent = cartItems.length;
//     }

//     // Function to filter products based on search query
//     function filterProducts(query) {
//         return products.filter((product) =>
//             product.name.toLowerCase().includes(query.toLowerCase())
//         );
//     }

//   // Search functionality
// searchButton.addEventListener("click", () => {
//     const query = searchInput.value.trim();
//     const filteredProducts = filterProducts(query);
//     renderProducts(filteredProducts);

//     // Scroll to the products section
//     const productsSection = document.getElementById("products");
//     if (productsSection) {
//         productsSection.scrollIntoView({ behavior: "smooth" });
//     }
// });

// searchInput.addEventListener("keyup", (event) => {
//     if (event.key === "Enter") {
//         const query = searchInput.value.trim();
//         const filteredProducts = filterProducts(query);
//         renderProducts(filteredProducts);

//         // Scroll to the products section
//         const productsSection = document.getElementById("products");
//         if (productsSection) {
//             productsSection.scrollIntoView({ behavior: "smooth" });
//         }
//     }
// });


//     // Initialize
//     updateCartCount();
//     renderProducts();
//     updateCartCount();
//     renderCartDropdown();
//     renderProducts();
//     updateProfileDropdown();
// });

