"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getQueryParam3 = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};
const loadOrderDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    const productId = getQueryParam3("id");
    if (!productId) {
        alert("Product ID not found in the URL.");
        return null;
    }
    try {
        const response = yield fetch(`http://localhost:3000/art/${productId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch product details.");
        }
        const product = yield response.json();
        console.log(product);
        return product;
    }
    catch (_a) {
        console.log("error on loading the element selected");
        return null;
    }
});
const fetchOrderDetails = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("http://localhost:3000/order", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch order details.");
        }
        const myOrder = yield response.json();
        console.log(JSON.stringify(myOrder, null, 2));
        const products = myOrder.flatMap((order) => order.items.map((item) => {
            var _a, _b, _c;
            return ({
                id: ((_a = item.art) === null || _a === void 0 ? void 0 : _a.id) || 0,
                title: ((_b = item.art) === null || _b === void 0 ? void 0 : _b.title) || "Unknown Title",
                quantity: (item === null || item === void 0 ? void 0 : item.quantity) || 0,
                price: parseFloat(((_c = item.art) === null || _c === void 0 ? void 0 : _c.price) || "0"),
            });
        }));
        return products;
    }
    catch (error) {
        console.error("Error fetching order details:", error);
        return [];
    }
});
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
const handleFinishButtonClick = (product, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const fullname = (_a = document.getElementById("full-name")) === null || _a === void 0 ? void 0 : _a.value.trim();
    const phone = (_b = document.getElementById("phone")) === null || _b === void 0 ? void 0 : _b.value.trim();
    const address = (_c = document.getElementById("address")) === null || _c === void 0 ? void 0 : _c.value.trim();
    if (!fullname || !phone || !address) {
        alert("Please fill in all required fields.");
        return;
    }
    try {
        const response = yield fetch("http://localhost:3000/order", {
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
        const result = yield response.json();
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
});
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const finishButton = document.getElementById("finish-button");
    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    if (!token) {
        alert("You are not logged in. Please log in to continue.");
        window.location.href = "../login/login.html";
        return;
    }
    try {
        const products = [];
        const products1 = yield fetchOrderDetails(token);
        const products2 = yield loadOrderDetails();
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
}));
const userEmailElement1 = document.getElementById('loginNav');
const username11 = localStorage.getItem('username');
if (username11) {
    userEmailElement1.innerHTML = `Hello,<br> ${username11}`;
}
else {
    window.location.href = '../login/index.html';
}
