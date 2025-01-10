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
const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};
const loadProductDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    const productId = getQueryParam("id");
    if (!productId) {
        return;
    }
    try {
        const response = yield fetch(`http://localhost:3000/art/${productId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch product details.");
        }
        const product = yield response.json();
        const imageElement = document.getElementById("product-image");
        const titleElement = document.getElementById("product-title");
        const priceElement = document.getElementById("product-price");
        const descriptionElement = document.getElementById("product-description");
        if (imageElement && titleElement && priceElement && descriptionElement) {
            imageElement.src = `http://localhost:3000/uploads/${product.imageUrl}`;
            titleElement.innerText = product.title;
            priceElement.innerText = `$${product.price}`;
            descriptionElement.innerText = product.description || "No description available.";
        }
    }
    catch (error) {
        console.error("Error fetching product details:", error);
    }
});
const toShop = document.getElementById('toShop');
toShop === null || toShop === void 0 ? void 0 : toShop.addEventListener('click', () => {
    redirectToOrderPage1();
});
const redirectToOrderPage1 = () => {
    const productId = getQueryParam("id");
    if (!productId) {
        alert("Product ID not found in the URL.");
        return;
    }
    window.location.href = `../order/order.html?id=${productId}`;
};
document.addEventListener("DOMContentLoaded", loadProductDetails);
const userEmailElement2 = document.getElementById('loginNav');
const username12 = localStorage.getItem('username');
if (username12) {
    userEmailElement2.innerHTML = `Hello,<br>${username12}`;
}
else {
    window.location.href = '../login/index.html';
}
