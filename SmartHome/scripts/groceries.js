"use strict";

let storesOuterWindow = document.getElementById("stores");
let storesWindow = document.getElementById("stores-selection");

const backgrounds = [
    "url('./media/images/groceries-background-1.jpg')",
    "url('./media/images/groceries-background-2.jpg')",
    "url('./media/images/groceries-background-3.jpg')",
];

// Generate a random index to select a background image
const randomIndex = Math.floor(Math.random() * backgrounds.length);
console.log(randomIndex)

// Apply the selected background to the container
document.body.style.setProperty("background-image", backgrounds[randomIndex]);

const stores = [
    { storeName: "Artisanal Bakery Experience", logo: "url('./media/images/stores/bakery-logo.png')" },
    { storeName: "Lidil", logo: "url('./media/images/stores/lidil-logo.png')" },
    { storeName: "O Silo", logo: "url('./media/images/stores/osilo-logo.png')" },
    { storeName: "Pingo Salgado", logo: "url('./media/images/stores/pingosalgado-logo.png')" },
    { storeName: "Pangaea", logo: "url('./media/images/stores/pangaea-logo.png')" },
    { storeName: "Maxipreço", logo: "url('./media/images/stores/maxipreco-logo.png')" },
];

const searchInput = document.getElementById("search-products-input");
const storeElements = [];

for (let store of stores) {
    const storeWrapper = document.createElement("div");
    storeWrapper.classList.add("store");

    const storeElement = document.createElement("div");
    storeElement.style.setProperty("background-image", store.logo);

    const storeNameText = document.createElement("p");
    storeNameText.innerText = store.storeName;

    storeWrapper.appendChild(storeElement);
    storeWrapper.appendChild(storeNameText);

    storeElements.push({ storeWrapper, storeName: store.storeName.toLowerCase() });
    storesWindow.appendChild(storeWrapper);
}

const noResultsMessage = document.createElement("p");
noResultsMessage.id = "no-search-results-found-message";
noResultsMessage.innerText = "No matching stores found...";
noResultsMessage.style.display = "none";
storesWindow.appendChild(noResultsMessage);

function searchStores() {
    const searchQuery = searchInput.value.toLowerCase();
    let foundResults = false;

    storeElements.forEach(({ storeWrapper, storeName }) => {
        if (storeName.includes(searchQuery)) {
            storeWrapper.style.display = "flex"; // Show the stores
            foundResults = true;
        } else {
            storeWrapper.style.display = "none"; // Hide the stores
        }
    });

    if (!foundResults) {
        // Show the message if no results were found
        noResultsMessage.style.display = "flex";
    } else {
        // Hide the message if results were found
        noResultsMessage.style.display = "none";
    }
}
searchInput.addEventListener("input", searchStores);

let cartView = document.getElementById("cart-view");

let cartListText = document.createElement("h2");
if (lang == "en") {
    cartListText.innerText = "My cart";
}
else if (lang == "pt") {
    cartListText.innerText = "Meu carrinho";
}
cartView.appendChild(cartListText)

let cartList = document.createElement('ul');
cartView.appendChild(cartList)

let creditCardFormText = document.createElement('h2');
if (lang == "en") {
    creditCardFormText.innerText = "Card payment:";
}
else if (lang == "pt") {
    creditCardFormText.innerText = "Pagamento com cartão:";
}
cartView.appendChild(creditCardFormText)
let creditCardForm = document.createElement('form');
creditCardForm.id = "credit-card-form"
creditCardForm.innerHTML = `
<div class="form-group">
    <input type="text" id="card-number" name="CardNumber" maxlength="19" placeholder="" required>
    <label for="cardNumber">${lang == "en" ? 'Card Number:' : lang == "pt" ? 'Número do cartão:' : null}</label>
</div>
<br>
<div style="display: flex;
flex-direction: row;
align-items: center;
flex-wrap: wrap;
gap: 15px;
justify-content: center;">
    <label for="expiryDate">${lang == "en" ? 'Expiry Date (MM/YYYY):' : lang == "pt" ? 'Data de validade (MM/YYYY):' : null}</label>
    <input type="month" id="card-expiry-date" name="ExpiryDate" placeholder="" required>
</div>
<br>
<div class="form-group">
    <input type="text" id="card-cvv" name="CVV" placeholder="" required>
    <label for="expiryDate">CVV</label>
</div>
<button style="width: 100%;
margin-top: 20px; color: white; background-color: green;">${lang == "en" ? 'Pay' : lang == "pt" ? 'Pagar' : null}</button>`;

// Add event listener to format and validate the card number input
const cardNumberInput = creditCardForm.querySelector('#card-number');
cardNumberInput.addEventListener('input', function () {
    // Remove non-numeric characters
    let cardNumber = this.value.replace(/\D/g, '');

    // Add hyphen bars for better formatting
    if (cardNumber.length > 4) {
        cardNumber = cardNumber.match(/.{1,4}/g).join('-');
    }

    // Limit to 16 characters
    cardNumber = cardNumber.slice(0, 19);

    this.value = cardNumber;
});

// Set the minimum allowed date for the expiry date input
const expiryDateInput = creditCardForm.querySelector('#card-expiry-date');
let cardMonth;
String(new Date().getMonth()).length == 1 ?
    cardMonth = String(new Date().getMonth() + 1).padStart(2, "0") : cardMonth = String(new Date().getMonth() + 1);
expiryDateInput.setAttribute('min', `${new Date().getFullYear()}-${cardMonth}`);
expiryDateInput.setAttribute('max', `${new Date().getFullYear() + 30}-${cardMonth}`);

// Add event listener to format the CVV and validate input
const cvvInput = creditCardForm.querySelector('#card-cvv');
cvvInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, ''); // Remove non-numeric characters
    // Maximum amount of digits is 4
    if (this.value.length > 4) {
        this.value = this.value.slice(0, 4);
    }
});
cartView.appendChild(creditCardForm);

document.getElementById("cart").addEventListener("click", () => {
    if (cartView.style.display == "flex") {
        cartView.style.removeProperty("display");
        document.getElementById("cart").style.removeProperty("outline");
    }
    else {
        cartView.style.display = "flex";
        document.getElementById("cart").style.outline = "2px solid green";
    }
});