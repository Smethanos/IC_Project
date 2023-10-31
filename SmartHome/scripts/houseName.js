"use strict";

// Function to retrieve the content from localStorage and update the h1 element 
if (localStorage.getItem("houseName")) {
    const welcomeBanner = document.getElementById("house-name");
    const savedContent = localStorage.getItem("houseName");
    if (savedContent) {
        welcomeBanner.textContent = savedContent;
    }
}
else {
    languageSelect.value === 'en' ?
    document.getElementById("house-name").innerText = 'My Home' :
    languageSelect.value === 'pt' ?
    document.getElementById("house-name").innerText = 'Minha Casa' :
    null;
}

const houseName = document.getElementById("house-name");
// Add an event listener to save content to localStorage when the content changes
houseName.addEventListener("input", () => {
    // Limit house name to 50 characters
    const maxLength = 50;
    if (houseName.textContent.length > maxLength) {
        houseName.textContent = houseName.textContent.substring(0, 50);
        houseName.blur(); // Remove focus to prevent further input
    }

    localStorage.setItem("houseName", houseName.textContent);
});

houseName.addEventListener("focusout", () => {
    houseName.textContent.length == 0 ?
    (languageSelect.value === 'en' ?
    document.getElementById("house-name").innerText = 'My Home!' :
    languageSelect.value === 'pt' ?
    document.getElementById("house-name").innerText = 'Minha Casa!' :
    null) : null;
});