"use strict";

let languageSelect = document.getElementById("language-select");

if (localStorage.getItem("language")) {
    languageSelect.value = localStorage.getItem("language");
}

languageSelect.addEventListener('change', () => {
    let dialog;
    let acceptDialog;
    let declineDialog;
    let confirmationMessage;
    if (lang == "en") {
        dialog = "Are you sure you want to change SmartHome's language to portuguese?";
        acceptDialog = "Mudar idioma para português";
        declineDialog = "Do not change language to portuguese";
        confirmationMessage = "Idioma alterado com sucesso";
    }
    else if (lang == "pt") {
        dialog = "Tem certeza que quer mudar o idioma da SmartHome para inglês?";
        acceptDialog = "Change language to english";
        declineDialog = "Manter idioma em português";
        confirmationMessage = "Language altered successfully";
    }
    showConfirmationDialog(dialog, acceptDialog, declineDialog, "negative",
        "language", document.getElementsByTagName("footer")[0], confirmationMessage, () => {
            localStorage.setItem("language", languageSelect.value);
            document.body.style.pointerEvents = "none";
            // Wait for confirmation message
            setTimeout(() => {
                location.reload();
            }, 3000);
        });
});

if (document.body.id == "SmartHomePage") {
    if (languageSelect.value === 'en') {
        document.documentElement.lang = "en";
        document.getElementById("preferences-text").innerText = 'General';
        document.getElementById("profiles").children[0].innerText = 'Profiles';
        document.getElementById("routine-text").innerText = 'My Routine';
        document.getElementById("environments-text").innerText = 'Environments';
        document.getElementById("AC-button-text").innerText = "Air Conditioning";
        document.getElementById("lighting-button-text").innerText = "Lighting";
        document.getElementById("AI-button-text").innerText = "AI";
        document.getElementById("windows-button-text").innerText = "Windows";
        document.getElementById("vacuum-robot-button-text").innerText = "Vacuum Robot";
        document.getElementById("groceries-button-text").innerText = "SmartHome Groceries";
        document.getElementById("add-environment-button-text").innerText = "Add Environment";
    } else if (languageSelect.value === 'pt') {
        document.documentElement.lang = "pt";
        document.getElementById("preferences-text").innerText = 'Opções Gerais';
        document.getElementById("profiles").children[0].innerText = 'Perfis';
        document.getElementById("routine-text").innerText = 'Minha Rotina';
        document.getElementById("environments-text").innerText = 'Ambientes';
        document.getElementById("AC-button-text").innerText = "Ar-condicionado";
        document.getElementById("lighting-button-text").innerText = "Iluminação";
        document.getElementById("AI-button-text").innerText = "Inteligência Artifical";
        document.getElementById("windows-button-text").innerText = "Janelas";
        document.getElementById("vacuum-robot-button-text").innerText = "Robô Aspirador";
        document.getElementById("groceries-button-text").innerText = "Mercearia SmartHome";
        document.getElementById("add-environment-button-text").innerText = "Adicionar Ambiente";
    }
}
else if (document.body.id == "SmartHomeGroceriesPage") {
    if (languageSelect.value === 'en') {
        document.documentElement.lang = "en";
        document.getElementById("logo").children[1].textContent = 'SmartHome Groceries';
        document.getElementById("search-products-bar").children[1].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" 
        width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 
        1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      </svg> Search Products`;
        document.getElementById("stores-text").textContent = 'Stores nearby';
        document.getElementById("cart").children[1].textContent = 'My cart';
    }
    else if (languageSelect.value === 'pt') {
        document.documentElement.lang = "pt";
        document.getElementById("logo").children[1].textContent = 'Mercearia SmartHome';
        document.getElementById("search-products-bar").children[1].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" 
        width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 
        1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      </svg> Procurar Produtos`;
        document.getElementById("stores-text").textContent = 'Lojas próximas';
        document.getElementById("cart").children[1].textContent = 'Meu carrinho';
    }
}

let lang = languageSelect.value;