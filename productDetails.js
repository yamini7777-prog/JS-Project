// productDetails.js
// Product Data (Same as Main Page)
const products = [
    {
        id: 1,
        name: "Brake Pads",
        price: 50,
        image: "placeholder.jpg",
        description: "High-quality brake pads for smooth stopping.",
        specifications: ["Material: Ceramic", "Durability: 50,000 miles", "Warranty: 1 year"]
    },
    {
        id: 2,
        name: "Wheel Covers",
        price: 25,
        image: "placeholder.jpg",
        description: "Stylish wheel covers to enhance your vehicle's look.",
        specifications: ["Material: ABS Plastic", "Size: 15-inch", "Finish: Glossy Black"]
    },
    {
        id: 3,
        name: "Mirror",
        price: 60,
        image: "placeholder.jpg",
        description: "Durable and clear side mirror for safe driving.",
        specifications: ["Type: Convex", "Adjustable: Yes", "Material: Glass"]
    },
    {
        id: 4,
        name: "Engine Oil",
        price: 30,
        image: "placeholder.jpg",
        description: "Premium engine oil for better performance.",
        specifications: ["Grade: 5W-30", "Volume: 1 liter", "Compatibility: All vehicles"]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));

    if (!productId) {
        alert("No product selected. Redirecting to main page.");
        window.location.href = "./index.html";
        return;
    }

    const product = products.find((item) => item.id === productId);

    if (!product) {
        alert("Invalid product ID. Redirecting to main page.");
        window.location.href = "./index.html";
        return;
    }

    // Populate Product Details
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-price").textContent = `$${product.price}`;

    const specList = document.getElementById("product-specifications");
    specList.innerHTML = ""; // Clear existing content
    product.specifications.forEach((spec) => {
        const listItem = document.createElement("li");
        listItem.textContent = spec;
        specList.appendChild(listItem);
    });
});
