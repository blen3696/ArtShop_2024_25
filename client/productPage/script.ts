interface ArtItem {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  description: string;
}

// Utility function to get query parameters
const getQueryParam = (param: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

// Function to load product details from the API
const loadProductDetails = async (): Promise<void> => {
  const productId = getQueryParam("id"); // Get the product ID from the URL
  if (!productId) {
    // alert("Product ID not found in the URL.");
    return;
  }

  try {
    // Fetch product details from the API
    const response = await fetch(`http://localhost:3000/art/${productId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product details.");
    }

    const product: ArtItem = await response.json();

    // Update the DOM with product details
    const imageElement = document.getElementById("product-image") as HTMLImageElement;
    const titleElement = document.getElementById("product-title") as HTMLHeadingElement;
    const priceElement = document.getElementById("product-price") as HTMLParagraphElement;
    const descriptionElement = document.getElementById("product-description") as HTMLParagraphElement;

    if (imageElement && titleElement && priceElement && descriptionElement) {
      imageElement.src = `http://localhost:3000/uploads/${product.imageUrl}`;
      titleElement.innerText = product.title;
      priceElement.innerText = `$${product.price}`;
      descriptionElement.innerText = product.description || "No description available.";
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    // alert("Failed to load product details. Please try again later.");
  }
};

// Redirect function for the "Shop Now" button
const toShop=document.getElementById('toShop') as HTMLButtonElement;
toShop?.addEventListener('click',()=>{
  redirectToOrderPage1();
})
const redirectToOrderPage1 = () => {
  const productId = getQueryParam("id");
  
  if (!productId) {
    alert("Product ID not found in the URL.");
    return;
  }

  // Redirect to the order page
  window.location.href=`../order/order.html?id=${productId}`;
};




// Event listener to load product details on DOMContentLoaded
document.addEventListener("DOMContentLoaded", loadProductDetails);
const userEmailElement2 = document.getElementById('loginNav') as HTMLElement;
const username12= localStorage.getItem('username');

if (username12) {
  userEmailElement2.innerHTML = `Hello,<br>${username12}`;
} else {
  window.location.href = '../login/index.html';
}