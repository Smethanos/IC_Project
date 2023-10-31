"use strict";

/**
 * Represents a Kitchen environment with various products.
 */
class Office {
    /**
     * Creates a new Kitchen instance.
     * @param {String} name - The name of the kitchen.
     * @param {String[]} products - An array of products to enable in the kitchen, the elements that compose the array must 
     * be identical to the name of the id's of the add functionality buttons.
     */
    constructor(name, products) {
        this._name = name;
        this._products = products;
        this.OfficeButtonEvent();
    }

    get name() {
        return this._name;
    }

    get products() {
        return this._products;
    }


    /**
     * Initializes an AirConditioner instance for this Kitchen instance.
     * @param {HTMLElement} element - The button element that will triggers 
     * the air conditioner window to be displayed.
     * @returns {void}
     */
    PC(element) {
        let OfficePCInstance = new PC(element, "environments", this.name);
    }

    cabinets(element) {
        // Office Cabinets
    }

    AC(element) {
        // Bedroom AC
        let OfficeACInstance = new AirConditioner(element, "environments", this.name);
    }

    lighting(element) {
        // Bedroom Lighting
    }

    speakers(element) {
        // Bedroom Speakers
    }

    windows(element) {
        // Bedroom Windows
        let OfficeWindowsInstance = new Windows(element, "environments", this.name);
    }

    OfficeButtonEvent() {
        let environmentWrapper = document.createElement("div");
        environmentWrapper.classList.add("environment");
        environmentWrapper.setAttribute("draggable", true);
        environmentsWindow.prepend(environmentWrapper);
        let officeButton = document.createElement("div");
        officeButton.classList.add("office");
        environmentWrapper.appendChild(officeButton);
        let officeButtonText = document.createElement("p");
        officeButtonText.classList.add("office-button-text");
        officeButtonText.innerText = this.name;
        environmentWrapper.appendChild(officeButtonText);

        officeButton.addEventListener("click", () => {
            document.body.classList.add("no-blur");
            document.body.style.backgroundImage = "url(./media/images/bedroom.jpg)";
            localStorage.setItem("chosenEnvironment", "office");
            localStorage.setItem("chosenEnvironmentName", this.name);

            environmentsOuterWindow.style.animation = "blur-transition-out 0.15s";
            setTimeout(() => {
                environmentsOuterWindow.style.animation = "blur-transition-in 0.15s";
                setTimeout(() => {
                    environmentsOuterWindow.style.animation = "none";
                }, 150);
                environmentsElements = Array.from(document.getElementsByClassName("environment"));
                environmentsElements.forEach(element => { element.style.display = "none"; });
                leftButton.style.display = 'none';
                rightButton.style.display = 'none';

                officeProducts.sort((a, b) => {
                    const labelA = lang === 'en' ? a.en : a.pt;
                    const labelB = lang === 'en' ? b.en : b.pt;
                    return labelA.localeCompare(labelB);
                });

                for (const product of officeProducts) {
                    if (this.products.includes(product.id)) {
                        let element = document.createElement("button");
                        element.classList.add("environment-preference-button", "officeFunctionality");
                        element.innerText = lang === 'en' ? product.en : product.pt;
                        environmentsWindow.appendChild(element);

                        if (product.id == "addOfficeAC") {
                            this.AC(element);
                        }
                        else if (product.id == "addOfficeWindows") {
                            this.windows(element);
                        }
                        else if (product.id == "addOfficePC") {
                            this.PC(element);
                        }
                        
                    }
                }

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
