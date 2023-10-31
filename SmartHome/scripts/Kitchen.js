"use strict";

/**
 * Represents a Kitchen environment with various products.
 */
class Kitchen {
    /**
     * Creates a new Kitchen instance.
     * @param {String} name - The name of the kitchen.
     * @param {String[]} products - An array of products to enable in the kitchen, the elements that compose the array must 
     * be identical to the name of the id's of the add functionality buttons.
     */
    constructor(name, products) {
        this._name = name;
        this._products = products;
        this.kitchenButtonEvent();
    }

    get name() {
        return this._name;
    }

    get products() {
        return this._products;
    }

    /**
     * Initializes the user interface for the kitchen toaster and its drawing functionality.
     * @param {HTMLElement} element - The element that triggers the toaster functionality.
     * @description This method is used to set up the user interface for a kitchen toaster,
     * allowing the user to draw a custom sketch and initiate the toasting process.
     * @returns {void}
     */
    toaster(element) {
        // Kitchen Toaster
        let toasterFunctionalityWrapper = document.createElement("div");
        toasterFunctionalityWrapper.id = "toaster-functionality-wrapper";
        let canvasWrapper = document.createElement("div");
        canvasWrapper.id = "canvasWrapper";

        let canvas = document.createElement("canvas");
        canvas.id = "canvas1";
        canvas.width = 200;
        canvas.height = 200;
        canvasWrapper.style.display = "none";

        let signaturePad = new SignaturePad(canvas, {
            minWidth: 1,
            maxWidth: 1,
        });

        let clearSignaturePad = document.createElement("button");
        clearSignaturePad.id = "clear-signature-pad-button";
        if (lang === 'en') {
            clearSignaturePad.innerText = "Clear drawing";
        }
        else if (lang === 'pt') {
            clearSignaturePad.innerText = "Limpar desenho";
        }
        clearSignaturePad.style.width = "40%";
        clearSignaturePad.style.minWidth = "200px";
        clearSignaturePad.style.boxShadow = "0px 0px 3px 0px rgba(0, 0, 0, 0.75)";
        clearSignaturePad.style.display = "none";

        let toastReadyButton = document.createElement("button");
        toastReadyButton.id = "toast-ready-button";
        if (lang === 'en') {
            toastReadyButton.innerText = "Toast!";
        }
        else if (lang === 'pt') {
            toastReadyButton.innerText = "Tostar!";
        }
        toastReadyButton.style.width = "40%";
        toastReadyButton.style.minWidth = "200px";
        toastReadyButton.style.background = "orange";
        toastReadyButton.style.boxShadow = "0px 0px 3px 0px rgba(0, 0, 0, 0.75)";
        toastReadyButton.style.display = "none";

        element.addEventListener("click", () => {
            // Transition animations
            environmentsOuterWindow.style.animation = "blur-transition-out 0.15s";
            setTimeout(() => {
                environmentsOuterWindow.style.animation = "blur-transition-in 0.15s";
                setTimeout(() => {
                    environmentsOuterWindow.style.removeProperty("animation");
                }, 150);
                environmentsWindow.querySelectorAll(".kitchenFunctionality").forEach(button => {
                    button.style.display = "none";
                });
                if (!document.getElementById("canvasWrapper")) {
                    environmentsWindow.appendChild(toasterFunctionalityWrapper);
                    toasterFunctionalityWrapper.appendChild(canvasWrapper);
                    canvasWrapper.appendChild(canvas);
                    toasterFunctionalityWrapper.appendChild(clearSignaturePad);
                    toasterFunctionalityWrapper.appendChild(toastReadyButton);
                }
                canvasWrapper.style.display = "flex";
                environmentsWindow.style.flexDirection = "column";
                environmentsWindow.style.alignItems = "center";
                environmentsWindow.style.alignContent = "center";
                clearSignaturePad.style.removeProperty("display");
                toastReadyButton.style.removeProperty("display");
                if (lang === 'en') {
                    environmentsText.innerText = "Smart Toaster";
                }
                else if (lang === 'pt') {
                    environmentsText.innerText = "Tostadeira Inteligente";
                }
            });
            clearSignaturePad.addEventListener("click", () => {
                signaturePad.clear();
            }, 150);
        })
    }

    smartPantry(element) {
        // Kitchen Smart Pantry
        let smartPantryFunctionalityWrapper = document.createElement("div");
        smartPantryFunctionalityWrapper.id = "smart-pantry-functionality-wrapper";

        let selectKitchenProduct = document.createElement("select");
        selectKitchenProduct.id = "select-kitchen-product-element";
        for (const productId of this.products) {
            if (productId === "addKitchenPantry" ||
                productId === "addKitchenFridge" ||
                productId === "addKitchenCabinets") {
                let productName = () => {
                    for (const product of kitchenProducts) {
                        if (product.id === productId) {
                            return {
                                en: product.en,
                                pt: product.pt,
                            };
                        }
                    }
                };
                selectKitchenProduct.innerHTML += `
                <option value="${(productName().en).toLowerCase()}">${lang === 'en' ? productName().en : productName().pt}</option>`;
                smartPantryFunctionalityWrapper.appendChild(selectKitchenProduct);
                smartPantryFunctionalityWrapper.appendChild(element);
            }
        }

        let pantryProductsDisplay = document.createElement("table");
        pantryProductsDisplay.classList.add("pantry-products-display");
        
        for (let i = 0; i < 5; i++) {
            let row = document.createElement("div");
            row.style.display = "table-row";
            pantryProductsDisplay.appendChild(row);
        
            for (let j = 0; j < 5; j++) {
                let cell = document.createElement("div");
                cell.style.display = "table-cell";
                cell.style.width = "100px";
                cell.style.height = "100px";
                cell.style.border = "1px solid black";
                row.appendChild(cell);
            }
        }
        
        smartPantryFunctionalityWrapper.appendChild(pantryProductsDisplay);

        element.addEventListener("click", () => {
            // Transition animations
            environmentsOuterWindow.style.animation = "blur-transition-out 0.15s";
            setTimeout(() => {
                environmentsOuterWindow.style.animation = "blur-transition-in 0.15s";
                setTimeout(() => {
                    environmentsOuterWindow.style.removeProperty("animation");
                }, 150);
                environmentsWindow.querySelectorAll(".kitchenFunctionality").forEach(button => {
                    button.style.display = "none";
                });
                environmentsWindow.style.flexDirection = "column";
                environmentsWindow.style.alignItems = "center";
                environmentsWindow.style.alignContent = "center";
                if (lang === 'en') {
                    environmentsText.innerText = `Smart Pantry`;
                }
                else if (lang === 'pt') {
                    environmentsText.innerText = `Dispensa Inteligente`;
                }
                environmentsWindow.appendChild(smartPantryFunctionalityWrapper);
            });
        })
    }

    pantry(element) {
        // Kitchen Pantry
    }

    cabinets(element) {
        // Kitchen Cabinets
    }

    fridge(element) {
        // Kitchen Fridge
    }

    /**
     * Initializes an AirConditioner instance for this Kitchen instance.
     * @param {HTMLElement} element - The button element that will triggers 
     * the air conditioner window to be displayed.
     * @returns {void}
     */
    AC(element) {
        // Kitchen AC
        let kitchenACInstance = new AirConditioner(element, "environments", this.name);
    }

    speakers(element) {
        // Kitchen Speakers
    }

    TV(element) {
        // Kitchen TV
    }

    lighting(element) {
        // Kitchen Lighting
    }

    windows(element) {
        // Kitchen Windows
        let kitchenWindowsInstance = new Windows(element, "environments", this.name);
    }

    kitchenButtonEvent() {
        let environmentWrapper = document.createElement("div");
        environmentWrapper.classList.add("environment");
        environmentWrapper.setAttribute("draggable", true);
        environmentsWindow.prepend(environmentWrapper);
        let kitchenButton = document.createElement("div");
        kitchenButton.classList.add("kitchen");
        environmentWrapper.appendChild(kitchenButton);
        let kitchenButtonText = document.createElement("p");
        kitchenButtonText.classList.add("kitchen-button-text");
        kitchenButtonText.innerText = this.name;
        environmentWrapper.appendChild(kitchenButtonText);

        kitchenButton.addEventListener("click", () => {
            document.body.classList.add("no-blur");
            document.body.style.backgroundImage = "url(./media/images/kitchen.jpg)";
            localStorage.setItem("chosenEnvironment", "kitchen");
            localStorage.setItem("chosenEnvironmentName", this.name);

            environmentsOuterWindow.style.animation = "blur-transition-out 0.15s";
            setTimeout(() => {
                environmentsOuterWindow.style.animation = "blur-transition-in 0.15s";
                setTimeout(() => {
                    environmentsOuterWindow.style.removeProperty("animation");
                }, 150);
                environmentsElements = Array.from(document.getElementsByClassName("environment"));
                environmentsElements.forEach(element => { element.style.display = "none"; });
                leftButton.style.display = 'none';
                rightButton.style.display = 'none';

                let pantryCreated = false;
                const elementsToSort = [];
                
                for (let product of kitchenProducts) {
                    if (this.products.includes(product.id)) {
                        let element;
                
                        if (product.id == "addKitchenPantry" || product.id == "addKitchenFridge" || product.id == "addKitchenCabinets") {
                            if (!pantryCreated) {
                                product = { id: "addKitchenSmartPantry", en: "Smart Pantry", pt: "Dispensa Inteligente" };
                                element = document.createElement("button");
                                element.classList.add("environment-preference-button", "kitchenFunctionality");
                                element.innerText = lang === 'en' ? product.en : product.pt;
                                elementsToSort.push(element);
                                this.smartPantry(element);
                                pantryCreated = true;
                            }
                        } else {
                            element = document.createElement("button");
                            element.classList.add("environment-preference-button", "kitchenFunctionality");
                            element.innerText = lang === 'en' ? product.en : product.pt;
                            elementsToSort.push(element); // Push elements to the array
                        }
                
                        if (product.id == "addKitchenToaster") {
                            this.toaster(element);
                        }
                        else if (product.id == "addKitchenAC") {
                            this.AC(element);
                        }
                        else if (product.id == "addKitchenWindows") {
                            this.windows(element);
                        }
                    }
                }
                
                // Sort the elements based on their innerText
                elementsToSort.sort((a, b) => {
                    const textA = a.innerText.toLowerCase();
                    const textB = b.innerText.toLowerCase();
                    return textA.localeCompare(textB);
                });
                
                // Append the sorted elements back to environmentsWindow
                elementsToSort.forEach((element) => {
                    environmentsWindow.appendChild(element);
                });

                environmentsText.innerText = this.name;
                // Add message if all atributes are null
                environmentsText.style.marginLeft = "45px";
                document.body.style.backdropFilter = "none";
                document.body.style.webkitBackdropFilter = "none";
                environmentsWindow.style.display = "flex";
                environmentsOuterWindow.style.justifyContent = "space-between";
                environmentsReturnButton.style.removeProperty("display");
            }, 150);
        });
    }
}