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

const products = [
    // Automotive Parts
    { 
        id: 1, 
        name: "Brake Pads", 
        price: 50, 
        image: "images/Brake-pads.png", 
        description: "High-quality ceramic brake pads designed to ensure safe and efficient braking performance. Compatible with most sedan models and offers long-lasting durability with a service life of up to 50,000 miles.",
        specifications: ["Material: Ceramic", "Durability: 50,000 miles", "Warranty: 1 year", "Compatible Vehicles: All sedans"]
    },
    { 
        id: 2, 
        name: "Wheel Covers", 
        price: 25, 
        image: "images/Wheel-covers.webp", 
        description: "Stylish 15-inch wheel covers made from durable ABS plastic. These glossy black covers are compatible with SUVs and hatchbacks, offering a sleek upgrade to your vehicle's appearance.",
        specifications: ["Material: ABS Plastic", "Size: 15-inch", "Finish: Glossy Black", "Compatible Models: SUVs and hatchbacks"]
    },
    { 
        id: 3, 
        name: "Side Mirror", 
        price: 60, 
        image: "images/Side-mirror.jpeg", 
        description: "A durable convex side mirror with anti-glare coating, designed to provide better visibility. It is adjustable and suitable for all vehicle types.",
        specifications: ["Type: Convex", "Adjustable: Yes", "Material: Glass", "Tint: Anti-glare coating"]
    },
    { 
        id: 4, 
        name: "Engine Oil", 
        price: 30, 
        image: "images/engine-oil.jpg", 
        description: "Premium 5W-30 engine oil that offers superior engine performance and protection. Certified for all vehicle types and ensures smooth operation.",
        specifications: ["Grade: 5W-30", "Volume: 1 liter", "Compatibility: All vehicles", "Certifications: API SN, ILSAC GF-6"]
    },
    { 
        id: 5, 
        name: "Air Filter", 
        price: 20, 
        image: "air-filter.jpg", 
        description: "Synthetic fiber air filter that provides excellent filtration efficiency. Designed for a service life of 15,000 miles, improving engine performance.",
        specifications: ["Type: Panel", "Efficiency: 98%", "Material: Synthetic fiber", "Service Life: 15,000 miles"]
    },
    { 
        id: 6, 
        name: "Spark Plug", 
        price: 10, 
        image: "spark-plug.jpg", 
        description: "High-performance iridium spark plug with a lifespan of up to 100,000 miles. Ensures better fuel efficiency and smooth ignition.",
        specifications: ["Material: Iridium", "Gap Size: 0.044 inches", "Heat Range: Medium", "Service Life: 100,000 miles"]
    },
    { 
        id: 7, 
        name: "Battery Charger", 
        price: 40, 
        image: "battery-charger.jpg", 
        description: "Efficient battery charger compatible with lead-acid batteries. Features adjustable output current and overload protection.",
        specifications: ["Input Voltage: 110-240V", "Output Current: 2-10A", "Battery Type: Lead-acid", "Features: Overload protection"]
    },
    { 
        id: 8, 
        name: "Windshield Wipers", 
        price: 15, 
        image: "windshield-wipers.jpg", 
        description: "Durable rubber and steel windshield wipers that provide streak-free wiping for all weather conditions. Universal fit for most cars.",
        specifications: ["Length: 24 inches", "Material: Rubber and steel", "Feature: Streak-free wipe", "Compatible Cars: All models"]
    },
    { 
        id: 9, 
        name: "Brake Fluid", 
        price: 12, 
        image: "brake-fluid.jpg", 
        description: "High-performance DOT 4 brake fluid with a boiling point of 230°C. Suitable for both disc and drum brakes.",
        specifications: ["Type: DOT 4", "Boiling Point: 230°C", "Volume: 500ml", "Compatibility: Disc and drum brakes"]
    },
    { 
        id: 10, 
        name: "Car Cover", 
        price: 50, 
        image: "car-cover.jpg", 
        description: "Durable waterproof polyester car cover with UV protection. Designed to fit sedans and SUVs.",
        specifications: ["Material: Polyester", "Waterproof: Yes", "UV Protection: Yes", "Size: Sedan and SUV compatible"]
    },
    { 
        id: 11, 
        name: "Seat Covers", 
        price: 70, 
        image: "seat-covers.jpg", 
        description: "Luxurious leather seat covers in a stylish black-and-red design. Waterproof and universally compatible with most car models.",
        specifications: ["Material: Leather", "Color: Black and red", "Waterproof: Yes", "Fits: Universal"]
    },
    { 
        id: 12, 
        name: "Floor Mats", 
        price: 30, 
        image: "floor-mats.jpg", 
        description: "Durable rubber floor mats with a non-slip surface. Easy to clean and suitable for all car types.",
        specifications: ["Material: Rubber", "Non-slip: Yes", "Color: Black", "Compatible Vehicles: All cars"]
    },
    { 
        id: 13, 
        name: "Dashboard Camera", 
        price: 90, 
        image: "dash-cam.jpg", 
        description: "Compact dashboard camera with full HD recording and night vision. Supports 64GB storage and ensures safety with clear visuals.",
        specifications: ["Resolution: 1080p", "Storage: 64GB support", "Features: Night vision", "Power: USB-powered"]
    },
    { 
        id: 14, 
        name: "Phone Mount", 
        price: 15, 
        image: "phone-mount.jpg", 
        description: "Magnetic phone mount with 360° rotation. Offers secure and convenient phone placement for navigation or hands-free use.",
        specifications: ["Type: Magnetic", "Rotation: 360°", "Material: Aluminum", "Fits: All phones"]
    },
    { 
        id: 15, 
        name: "Steering Wheel Cover", 
        price: 25, 
        image: "steering-wheel-cover.jpg", 
        description: "Anti-slip steering wheel cover made of durable PU leather. Fits most standard steering wheels and provides a comfortable grip.",
        specifications: ["Material: PU Leather", "Diameter: 15 inches", "Color: Black", "Grip: Anti-slip"]
    },
    { 
        id: 16, 
        name: "LED Headlights", 
        price: 80, 
        image: "led-headlights.jpg", 
        description: "Bright LED headlights with a color temperature of 6000K. These lights offer enhanced visibility and a long lifespan of 30,000 hours.",
        specifications: ["Color Temperature: 6000K", "Lifespan: 30,000 hours", "Power: 50W", "Voltage: 12V"]
    },
    { 
        id: 17, 
        name: "Roof Rack", 
        price: 150, 
        image: "roof-rack.jpg", 
        description: "Sturdy aluminum roof rack with a load capacity of 100kg. Adjustable and compatible with most SUVs and vans.",
        specifications: ["Material: Aluminum", "Load Capacity: 100kg", "Adjustable: Yes", "Fits: SUVs and vans"]
    },
    { 
        id: 18, 
        name: "Exhaust Tip", 
        price: 40, 
        image: "exhaust-tip.jpg", 
        description: "Stylish stainless steel exhaust tip with a dual outlet design and chrome finish. Enhances the look of your vehicle's exhaust system.",
        specifications: ["Material: Stainless steel", "Design: Dual outlet", "Length: 6 inches", "Finish: Chrome"]
    },
    { 
        id: 19, 
        name: "Jump Starter", 
        price: 120, 
        image: "jump-starter.jpg", 
        description: "Portable jump starter with a capacity of 10,000mAh. Features LED flashlight and dual USB ports for charging devices.",
        specifications: ["Capacity: 10,000mAh", "Voltage: 12V", "USB Ports: 2", "Features: LED flashlight"]
    },
    { 
        id: 20, 
        name: "Tire Inflator", 
        price: 35, 
        image: "tire-inflator.jpg", 
        description: "Compact tire inflator with a digital display and a maximum pressure of 150 PSI. Ideal for car and bike tires.",
        specifications: ["Pressure: 150 PSI", "Power Source: 12V", "Display: Digital", "Compatibility: Car and bike tires"]
    },
    { 
        id: 21, 
        name: "Car Wax", 
        price: 20, 
        image: "car-wax.jpg", 
        description: "Liquid car wax that provides a high-gloss finish and long-lasting protection. Easy to apply by hand or machine.",
        specifications: ["Type: Liquid", "Finish: High gloss", "Application: Hand or machine", "Protection: UV resistant"]
    },
    { 
        id: 22, 
        name: "Car Vacuum Cleaner", 
        price: 45, 
        image: "car-vacuum.jpg", 
        description: "Powerful 120W car vacuum cleaner with a HEPA filter. Comes with a 5-meter cord for convenient cleaning.",
        specifications: ["Power: 120W", "Cord Length: 5 meters", "Filter Type: HEPA", "Weight: 1.5 kg"]
    },
    { 
        id: 23, 
        name: "Sunshade", 
        price: 18, 
        image: "sunshade.jpg", 
        description: "Reflective fabric sunshade that blocks 99% UV rays. Foldable and compatible with most vehicles.",
        specifications: ["Material: Reflective fabric", "Size: Universal fit", "Blocks: 99% UV rays", "Foldable: Yes"]
    },
    { 
        id: 24, 
        name: "Car Key Cover", 
        price: 10, 
        image: "key-cover.jpg", 
        description: "Durable silicone key cover that is waterproof and provides a secure fit for keyless entry fobs.",
        specifications: ["Material: Silicone", "Color: Blue", "Waterproof: Yes", "Fits: Keyless entry fobs"]
    },
    { 
        id: 25, 
        name: "Anti-Skid Pedals", 
        price: 30, 
        image: "anti-skid-pedals.jpg", 
        description: "Aluminum alloy anti-skid pedals with bolt-on installation. Offers enhanced grip and safety for manual cars.",
        specifications: ["Material: Aluminum alloy", "Grip: Anti-slip", "Installation: Bolt-on", "Compatibility: Manual cars"]
    },
    { 
        id: 26, 
        name: "Fog Lights", 
        price: 70, 
        image: "fog-lights.jpg", 
        description: "Universal fog lights with yellow illumination and a lifespan of 20,000 hours. Perfect for foggy or rainy weather conditions.", 
        specifications: ["Color: Yellow", "Lifespan: 20,000 hours", "Power: 55W", "Voltage: 12V"] 
    },
    { 
        id: 27, 
        name: "Car Horn", 
        price: 25, 
        image: "car-horn.jpg", 
        description: "Loud and clear dual-tone car horn with a 110 dB sound level. Weather-resistant and easy to install.", 
        specifications: ["Sound Level: 110 dB", "Type: Dual-tone", "Waterproof: Yes", "Compatibility: All vehicles"] 
    },
    { 
        id: 28, 
        name: "Tire Chains", 
        price: 90, 
        image: "tire-chains.jpg", 
        description: "Heavy-duty steel tire chains for improved traction in snow and ice. Adjustable to fit various tire sizes.", 
        specifications: ["Material: Steel", "Fits: 14-20 inch tires", "Type: Adjustable", "Use: Snow and ice"] 
    },
    { 
        id: 29, 
        name: "Oil Filter", 
        price: 15, 
        image: "oil-filter.jpg", 
        description: "High-efficiency oil filter designed to protect engines by removing contaminants. Fits most gasoline engines.", 
        specifications: ["Type: Spin-on", "Efficiency: 99%", "Material: Metal and filter paper", "Compatibility: Gasoline engines"] 
    },
    { 
        id: 30, 
        name: "Headrest Pillow", 
        price: 20, 
        image: "headrest-pillow.jpg", 
        description: "Memory foam headrest pillow that provides neck support and comfort during long drives. Covered in a breathable fabric.", 
        specifications: ["Material: Memory foam", "Cover: Breathable fabric", "Color: Black", "Use: Neck support"] 
    } ];

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
