"use strict";

/**
 * Represents a Bathroom environment with various products.
 */
class Bathroom {
    /**
     * Creates a new Bathroom instance.
     * @param {String} name - The name of the bathroom.
     * @param {String[]} products - An array of products to enable in the bathroo, the elements that compose the array must 
     * be identical to the name of the id's of the add functionality buttons.
     */
    constructor(name, products) {
        this._name = name;
        this._products = products;
        this.bathroomButtonEvent();
    }

    get name() {
        return this._name;
    }

    get products() {
        return this._products;
    }

    windows(element) {
        // Bathroom Windows
        let bathroomWindowsInstance = new Windows(element, "environments", this.name);
    }

    speakers(element) {
        // Bathroom Speakers
    }

    flushToilet(element) {
        // Flush Toilet
    }

    lighting(element) {
        // Bathroom Lighting
    }

    bathroomButtonEvent() {
        let environmentWrapper = document.createElement("div");
        environmentWrapper.classList.add("environment");
        environmentWrapper.setAttribute("draggable", true);
        environmentsWindow.prepend(environmentWrapper);
        let bathroomButton = document.createElement("div");
        bathroomButton.classList.add("bathroom");
        environmentWrapper.appendChild(bathroomButton);
        let bathroomButtonText = document.createElement("p");
        bathroomButtonText.classList.add("bathroom-button-text");
        bathroomButtonText.innerText = this.name;
        environmentWrapper.appendChild(bathroomButtonText);

        bathroomButton.addEventListener("click", () => {
            document.body.classList.add("no-blur");
            document.body.style.backgroundImage = "url(./media/images/bathroom.jpg)";
            localStorage.setItem("chosenEnvironment", "bathroom");
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

                bathroomProducts.sort((a, b) => {
                    const labelA = lang === 'en' ? a.en : a.pt;
                    const labelB = lang === 'en' ? b.en : b.pt;
                    return labelA.localeCompare(labelB);
                });

                for (const product of bathroomProducts) {
                    if (this.products.includes(product.id)) {
                        let element = document.createElement("button");
                        element.classList.add("environment-preference-button", "bathroomFunctionality");
                        element.innerText = lang === 'en' ? product.en : product.pt;
                        environmentsWindow.appendChild(element);

                        if (product.id == "addBathroomWindows") {
                            this.windows(element);
                        }
                    }
                }

                // Add message if all atributes are null
                environmentsText.innerText = this.name;
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
