"use strict";

let environments = [];
let addEnvironmentButton = document.getElementById("add-environment-button");

if (localStorage.getItem("environments")) {
    for (let environment of JSON.parse(localStorage.getItem("environments"))) {

        if (environment.name === "Bedroom" || environment.name === "Quarto" ||
            environment.name === "Kitchen" || environment.name === "Cozinha" ||
            environment.name === "Bathroom" || environment.name === "Casa de Banho"
            || environment.name === "Living Room" || environment.name === "Sala de Estar") {

            if (lang == "en") {
                if (environment.name == "Quarto") {
                    environment.name = "Bedroom";
                }
                else if (environment.name == "Cozinha") {
                    environment.name = "Kitchen";
                }
                else if (environment.name == "Casa de Banho") {
                    environment.name = "Bathroom";
                }
                else if (environment.name == "Sala de Estar") {
                    environment.name = "Living Room";
                }
            }
            else if (lang == "pt") {
                if (environment.name == "Bedroom") {
                    environment.name = "Quarto";
                }
                else if (environment.name == "Kitchen") {
                    environment.name = "Cozinha";
                }
                else if (environment.name == "Bathroom") {
                    environment.name = "Casa de Banho";
                }
                else if (environment.name == "Living Room") {
                    environment.name = "Sala de Estar";
                }
            }

        }

        addEnvironment(environment.type, environment.name, environment.products);
    }
} else {
    const bedroomIds = bedroomProducts.map(product => product.id);
    const bathroomIds = bathroomProducts.map(product => product.id);
    const kitchenIds = kitchenProducts.map(product => product.id);
    const livingRoomIds = livingRoomProducts.map(product => product.id);

    addEnvironment("Bedroom", "Bedroom",
        bedroomIds);
    addEnvironment("Kitchen", "Kitchen",
        kitchenIds);
    addEnvironment("Living Room", "Living Room",
        livingRoomIds);
    addEnvironment("Bathroom", "Bathroom",
        bathroomIds);

}

/**
 * Creates and adds a new environment to the user's environments given a specified type, name, and products.
 * This function creates an instance of an environment class based on the provided type (e.g., LivingRoom, Bathroom, Bedroom, Kitchen)
 * and initializes it with the given name and products. It then stores the environment data in a collection and serializes it
 * to JSON for storage in the browser's local storage.
 *
 * @param {String} type - The type of the environment (e.g., "Living Room", "Bathroom", "Bedroom", "Kitchen").
 * @param {String} name - The name or identifier for the environment.
 * @param {Array} products - An array of products or features associated with the environment.
 * @returns {void}
 */
function addEnvironment(type, name, products) {

    if (type == "Living Room") {
        new LivingRoom(name, products);
    }
    else if (type == "Bathroom") {
        new Bathroom(name, products);
    }
    else if (type == "Bedroom") {
        new Bedroom(name, products);
    }
    else if (type == "Kitchen") {
        new Kitchen(name, products);
    }

    let environment = {
        "type": type,
        "name": name, "products": products
    };
    console.log(environment);
    environments.push(environment);

    // Serialize the instance to JSON
    const serializedInstances = JSON.stringify(environments);
    console.log(serializedInstances);

    // Store the serialized instance in localStorage
    localStorage.setItem("environments", serializedInstances);
}

// Environment form
let addEnvironmentForm = document.createElement("form");
addEnvironmentForm.id = "add-environment-form";

// Environment name input
let environmentNameInputOuterBox = document.createElement("div");
environmentNameInputOuterBox.classList.add("form-group");
let environmentNameInput = document.createElement("input");
environmentNameInput.id = "add-environment-name-input";
environmentNameInput.type = "text";
environmentNameInput.maxLength = "50";
environmentNameInput.placeholder = " ";
environmentNameInput.required = true;

/**
 * Validates the input for an environment name.
 * This function checks if the input value for an environment name is valid, considering the following criteria:
 * - The input is not empty.
 * - The input does not match an existing environment name stored in local storage.
 * If the input is not valid, a custom validity message is set, and the function returns false.
 * If the input is valid, the custom validity message is cleared, and the function returns true.
 *
 * @returns {boolean} - true if the input is valid, false if it's invalid.
 */
function isEnvironmentNameValid() {
    const inputValue = environmentNameInput.value.trim();
    const environments = JSON.parse(localStorage.getItem("environments")) || []; // Retrieve existing environments from local storage or initialize as an empty array

    if (environmentNameInput.value.trim().length == 0) {
        return false;
    }
    // Check if the input matches an existing environment
    else if (environments.some((environment) => environment.name === inputValue)) {
        environmentNameInput.setCustomValidity(lang == "en" ? "This name is already taken. Please choose a different environment name."
            : lang == "pt" ? "Este nome já está em uso. Escolha um nome de ambiente diferente." : null);
        return false;
    } else {
        environmentNameInput.setCustomValidity(""); // Clear custom validity if input is valid
        return true;
    }
}

let labelForEnvironmentNameInput = document.createElement("label");
labelForEnvironmentNameInput.htmlFor = "add-environment-name-input";
if (lang == "en") {
    labelForEnvironmentNameInput.innerText = "Environment name";
}
else if (lang == "pt") {
    labelForEnvironmentNameInput.innerText = "Nome do ambiente";
}
addEnvironmentForm.appendChild(environmentNameInputOuterBox);
environmentNameInputOuterBox.appendChild(environmentNameInput);
environmentNameInputOuterBox.appendChild(labelForEnvironmentNameInput);
environmentNameInputOuterBox.style.display = "none";
environmentNameInput.style.display = "none";
labelForEnvironmentNameInput.style.display = "none";

// Environment Type
let addEnvironmentTypes = document.createElement("div");
addEnvironmentTypes.id = "add-environments-selection";
addEnvironmentForm.appendChild(addEnvironmentTypes);
addEnvironmentTypes.style.display = "none";

// Products
let addProductsSelection = document.createElement("div");
addProductsSelection.id = "add-products-selection";
addEnvironmentForm.appendChild(addProductsSelection);
addProductsSelection.style.display = "none";

/**
 * Creates an add product button with the specified properties and adds it to the products choice section
 * in the add environment form.
 * The button's text content is set based on the current language ('lang' variable).
 * The created button is then appended to the 'addProductsSelection' section.
 *
 * @param {String} id - The id for the button element.
 * @param {String} labelEn - The label text for the button in English.
 * @param {String} labelPt - The label text for the button in Portuguese.
 * @returns {void}
 */
function createAddProductButton(id, labelEn, labelPt) {
    const button = document.createElement("button");
    button.id = id;
    button.type = "button";
    button.innerText = lang === 'en' ? labelEn : labelPt;
    addProductsSelection.appendChild(button);
}

/**
 * Creates an environment type section button in the add environment form.
 *
 * @param {String} id - The id of the section button.
 * @param {String} labelEn - The label text in English.
 * @param {String} labelPt - The label text in Portuguese.
 * @param {Array} products - An array of products to be associated with this section.
 * @param {String} backgroundColor - The background color of the type button.
 * @returns {void}
 */
function createEnvironmentTypeSection(id, labelEn, labelPt, products, backgroundColor) {
    const typeWrapper = document.createElement("div");
    typeWrapper.style.display = "flex";
    typeWrapper.style.flexDirection = "column";
    typeWrapper.style.alignItems = "center";
    typeWrapper.classList.add("add-environment-type-button");
    addEnvironmentTypes.appendChild(typeWrapper);

    const typeButton = document.createElement("div");
    typeButton.id = id;
    typeButton.style.backgroundColor = backgroundColor;
    typeWrapper.appendChild(typeButton);

    const typeText = document.createElement("p");
    typeText.innerText = lang === 'en' ? labelEn : labelPt;
    typeWrapper.appendChild(typeText);

    typeButton.addEventListener("click", () => {
        if (typeButton.style.backgroundColor === "green") {
            typeButton.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
            while (addProductsSelection.firstChild) {
                addProductsSelection.removeChild(addProductsSelection.firstChild);
            }
            if (submitEnvironmentButton) {
                submitEnvironmentButton.style.display = "none";
            }
        } else {
            while (addProductsSelection.firstChild) {
                addProductsSelection.removeChild(addProductsSelection.firstChild);
            }
            if (submitEnvironmentButton) {
                submitEnvironmentButton.style.display = "none";
            }

            if (isEnvironmentNameValid()) {
                typeButton.style.backgroundColor = "green";
                for (const functionality of products) {
                    createAddProductButton(functionality.id, functionality.en, functionality.pt);
                }
                addEnvironmentTypes.childNodes.forEach((node) => {
                    if (node !== typeWrapper) {
                        node.childNodes[0].style.backgroundColor = "rgba(0, 0, 0, 0.7)";
                    }
                });
                addProductsSelection.style.display = "flex";
                let addProductsText = document.createElement("p");
                addProductsText.innerText = lang === "en" ? `Which products does this ${labelEn.toLowerCase()} have?` : `Quais produtos este ${labelPt.toLowerCase()} tem?`;
                addProductsText.classList.add("add-products-text");
                addProductsSelection.prepend(addProductsText);
            } else {
                environmentNameInput.reportValidity();
            }
        }
    });
}

// Create the environment sections
createEnvironmentTypeSection("add-bedroom-button", "Bedroom", "Quarto", bedroomProducts, "rgba(0, 0, 0, 0.7");
createEnvironmentTypeSection("add-bathroom-button", "Bathroom", "Casa de Banho", bathroomProducts, "rgba(0, 0, 0, 0.7");
createEnvironmentTypeSection("add-kitchen-button", "Kitchen", "Cozinha", kitchenProducts, "rgba(0, 0, 0, 0.7");
createEnvironmentTypeSection("add-living-room-button", "Living Room", "Sala de Estar", livingRoomProducts, "rgba(0, 0, 0, 0.7");

let submitEnvironmentButton;
addProductsSelection.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON") {
        if (!event.target.textContent.includes(" ✓")) {
            event.target.textContent = event.target.textContent + " ✓";

            if (submitEnvironmentButton) {
                if (submitEnvironmentButton.style.display == "none") {
                    submitEnvironmentButton.style.removeProperty("display");
                }
            }
        }
        else {
            event.target.textContent = event.target.textContent.replace(" ✓", "");

            if (submitEnvironmentButton) {
                const hasCheckmarkButton = Array.from(addProductsSelection.querySelectorAll("button")).some(button => {
                    return button.textContent.includes(" ✓");
                });
                if (!hasCheckmarkButton) {
                    submitEnvironmentButton.style.display = "none";
                }
            }
        }

        // Check if environmentNameInput has at least 1 character
        const inputValue = environmentNameInput.value.trim();
        const hasCharacter = inputValue.length > 0;

        // Create the submit button only if environment name input is filled
        if (hasCharacter && !submitEnvironmentButton) {
            submitEnvironmentButton = document.createElement("button");
            if (lang == "en") {
                submitEnvironmentButton.textContent = "Submit";
            }
            else if (lang == "pt") {
                submitEnvironmentButton.textContent = "Submeter";
            }
            submitEnvironmentButton.id = "submit-environment-button";
            submitEnvironmentButton.style.removeProperty("display");
            addEnvironmentForm.appendChild(submitEnvironmentButton);

            addEnvironmentForm.addEventListener("submit", event => {
                event.preventDefault()
                let dialog;
                let acceptDialog;
                let declineDialog;
                let confirmationMessage;
                if (lang == "en") {
                    dialog = `Are you sure you want to add "${environmentNameInput.value}" to your environments?`;
                    acceptDialog = `Add "${environmentNameInput.value}" to my environments`;
                    declineDialog = `Do not add "${environmentNameInput.value}" to my environments`;
                    confirmationMessage = `"${environmentNameInput.value}" was successfully added to your environments`;
                }
                else if (lang == "pt") {
                    dialog = `Tem certeza que quer adicionar "${environmentNameInput.value}" aos seus ambientes?`;
                    acceptDialog = `Adicionar "${environmentNameInput.value}" aos meus ambientes`;
                    declineDialog = `Não adicionar "${environmentNameInput.value}" aos meus ambientes`;
                    confirmationMessage = `"${environmentNameInput.value}" foi adicionado com sucesso aos seus ambientes`;
                }

                showConfirmationDialog(dialog, acceptDialog, declineDialog, "positive",
                    "addEnvironments", environmentsOuterWindow, confirmationMessage, () => {
                        if (document.getElementById("add-bedroom-button").style.backgroundColor == "green") {
                            console.log("Create Bedroom");
                            const buttonsWithCheckmarks = Array.from(addProductsSelection.querySelectorAll("[id]")).filter(element => {
                                return element.textContent.includes(" ✓");
                            }).map(element => element.id);
                            let name = environmentNameInput.value;
                            addEnvironment("Bedroom", name, buttonsWithCheckmarks);
                        }
                        else if (document.getElementById("add-bathroom-button").style.backgroundColor == "green") {
                            console.log("Create Bathroom");
                            const buttonsWithCheckmarks = Array.from(addProductsSelection.querySelectorAll("[id]")).filter(element => {
                                return element.textContent.includes(" ✓");
                            }).map(element => element.id);
                            let name = environmentNameInput.value;
                            addEnvironment("Bathroom", name, buttonsWithCheckmarks);
                        }
                        else if (document.getElementById("add-kitchen-button").style.backgroundColor == "green") {
                            console.log("Create Kitchen");
                            const buttonsWithCheckmarks = Array.from(addProductsSelection.querySelectorAll("[id]")).filter(element => {
                                return element.textContent.includes(" ✓");
                            }).map(element => element.id);
                            let name = environmentNameInput.value;
                            addEnvironment("Kitchen", name, buttonsWithCheckmarks);
                        }
                        else if (document.getElementById("add-living-room-button").style.backgroundColor == "green") {
                            console.log("Create Living Room");
                            const buttonsWithCheckmarks = Array.from(addProductsSelection.querySelectorAll("[id]")).filter(element => {
                                return element.textContent.includes(" ✓");
                            }).map(element => element.id);
                            let name = environmentNameInput.value;
                            addEnvironment("Living Room", name, buttonsWithCheckmarks);
                        }
                        Array.from(document.getElementsByClassName("environment")).forEach(element => { element.style.display = "none"; });
                    });
            });
        }
    }
});

environmentNameInput.addEventListener("input", () => {
    isEnvironmentNameValid();

    // Show or hide other elements as needed based on the input value
    if (!isEnvironmentNameValid()) {
        addProductsSelection.style.display = "none";
        if (submitEnvironmentButton) {
            submitEnvironmentButton.style.display = "none";
        }

        document.querySelectorAll(".add-environment-type-button").forEach(element => {
            element.children[0].style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        });
    }
});

environmentNameInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default form submission page refresh
    }
});

addEnvironmentButton.addEventListener("click", () => {
    // Transition animations
    environmentsOuterWindow.style.animation = "blur-transition-out 0.15s";
    setTimeout(() => {
        environmentsOuterWindow.style.animation = "blur-transition-in 0.15s";
        setTimeout(() => {
            environmentsOuterWindow.style.removeProperty("animation");
        }, 150);
        if (!environmentsWindow.classList.contains("expanded-environments-view")) {
            expandEnvironmentsButton.click();
        }
        environmentsWindow.appendChild(addEnvironmentForm);
        expandEnvironmentsButton.style.display = "none";
        environmentsWindow.classList.add("add-environment-window");
        environmentsElements = Array.from(document.getElementsByClassName("environment"));
        environmentsElements.forEach(element => { element.style.display = "none"; });
        environmentsReturnButton.style.removeProperty("display");
        environmentsText.style.marginLeft = "45px";
        addEnvironmentForm.style.display = "flex";
        if (lang === 'en') {
            environmentsText.innerText = "Add Environment";
        }
        else if (lang === 'pt') {
            environmentsText.innerText = "Adicionar Ambiente";
        }
        environmentNameInputOuterBox.style.removeProperty("display");
        environmentNameInput.style.removeProperty("display");
        labelForEnvironmentNameInput.style.removeProperty("display");
        addEnvironmentTypes.style.display = "grid";
        document.querySelectorAll(".add-environment-type-button").forEach(element => {
            element.style.display = "flex";
        });
    }, 150);
});