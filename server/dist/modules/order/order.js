const getQueryParam3 = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};
const loadOrderDetails = async () => {
    const productId = getQueryParam3("id");
    if (!productId) {
        alert("Product ID not found in the URL.");
        return null;
    }
    try {
        const response = await fetch(`http://localhost:3000/art/${productId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch product details.");
        }
        const product = await response.json();
        console.log(product);
        return product;
    }
    catch {
        console.log("error on loading the element selected");
        return null;
    }
};
const fetchOrderDetails = async (token) => {
    try {
        const response = await fetch("http://localhost:3000/order", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch order details.");
        }
        const myOrder = await response.json();
        console.log(JSON.stringify(myOrder, null, 2));
        const products = myOrder.flatMap((order) => order.items.map((item) => ({
            id: item.art?.id || 0,
            title: item.art?.title || "Unknown Title",
            quantity: item?.quantity || 0,
            price: parseFloat(item.art?.price || "0"),
        })));
        return products;
    }
    catch (error) {
        console.error("Error fetching order details:", error);
        return [];
    }
};
const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => total + product.quantity * product.price, 0);
};
const renderOrderTable = (products) => {
    const tableBody = document.getElementById("order-table-body");
    const totalPriceElement = document.getElementById("total-price");
    tableBody.innerHTML = "";
    products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${product.title}</td>
      <td>${product.quantity}</td>
      <td>$${(product.quantity * product.price).toFixed(2)}</td>
    `;
        tableBody.appendChild(row);
    });
    totalPriceElement.textContent = calculateTotalPrice(products).toFixed(2);
};
const orderButton = document.getElementById("order-button");
const renderUserDataForm = () => {
    const formContainer = document.getElementById("user-data-form");
    formContainer.innerHTML = `
    <label for="full-name">Full Name:</label>
    <input type="text" id="full-name" placeholder="Enter your full name" required>
    
    <label for="phone">Phone Number:</label>
    <input type="text" id="phone" placeholder="Enter your phone number" required>
    
    <label for="address">Address:</label>
    <input type="text" id="address" placeholder="Enter your address" required>
    <button id="finish-button" class="btn btn-primary mt-3">Finish</button>
  `;
};
const finishButton = document.getElementById("finish-button");
const handleFinishButtonClick = async (product, token) => {
    const fullname = document.getElementById("full-name")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const address = document.getElementById("address")?.value.trim();
    if (!fullname || !phone || !address) {
        alert("Please fill in all required fields.");
        return;
    }
    try {
        const response = await fetch("http://localhost:3000/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                fullname,
                phone,
                address,
                items: [{ artId: product.id, quantity: 1 }],
            }),
        });
        if (!response.ok) {
            throw new Error("Failed to place order.");
        }
        const result = await response.json();
        console.log("Order placed successfully:", result);
        alert("Order placed successfully!");
        finishButton.disabled = true;
        finishButton.textContent = "Order Placed";
        product.quantity -= 1;
        renderOrderTable([product]);
    }
    catch (error) {
        console.error("Error placing order:", error);
    }
};
document.addEventListener("DOMContentLoaded", async () => {
    const finishButton = document.getElementById("finish-button");
    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    if (!token) {
        alert("You are not logged in. Please log in to continue.");
        window.location.href = "../login/login.html";
        return;
    }
    try {
        const products = [];
        const products1 = await fetchOrderDetails(token);
        const products2 = await loadOrderDetails();
        if (products2) {
            products.push(products2);
        }
        products.push(...products1);
        renderOrderTable(products);
        orderButton.addEventListener("click", () => {
            renderUserDataForm();
            const finishButton = document.getElementById("finish-button");
            if (finishButton && products2) {
                finishButton.addEventListener("click", () => {
                    handleFinishButtonClick(products2, token);
                });
            }
        });
    }
    catch (error) {
        console.error("Error initializing page:", error);
        alert("Failed to load order details. Please try again.");
    }
});
const userEmailElement1 = document.getElementById('loginNav');
const username11 = localStorage.getItem('username');
if (username11) {
    userEmailElement1.innerHTML = `Hello,<br> ${username11}`;
}
else {
    window.location.href = '../login/index.html';
}
//# sourceMappingURL=order.js.map