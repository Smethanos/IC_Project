"use strict";

/**
 * Represents a Bedroom environment with various products.
 */
class Bedroom {
    /**
     * Creates a new Bedroom instance.
     * @param {String} name - The name of the bedroom.
     * @param {String[]} products - An array of products to enable in the bedroom, the elements that compose the array must 
     * be identical to the name of the id's of the add functionality buttons.
     */
    constructor(name, products) {
        this._name = name;
        this._products = products;
        this.bedroomButtonEvent();
    }

    get name() {
        return this._name;
    }

    get products() {
        return this._products;
    }

    TV(element) {
        // Bedroom TV
    }

    /**
     * Initializes an AirConditioner instance for this Bedroom instance.
     * @param {HTMLElement} element - The button element that will triggers 
     * the air conditioner window to be displayed.
     * @returns {void}
     */
    AC(element) {
        // Bedroom AC
        let bedroomACInstance = new AirConditioner(element, "environments", this.name);
    }

    lighting(element) {
        // Bedroom Lighting
    }

    speakers(element) {
        // Bedroom Speakers
    }

    windows(element) {
        // Bedroom Windows
        let bedroomWindowsInstance = new Windows(element, "environments", this.name);
    }

    fireplace(element) {
        // Bedroom Fireplace
    }

    bedroomButtonEvent() {
        let environmentWrapper = document.createElement("div");
        environmentWrapper.classList.add("environment");
        environmentWrapper.setAttribute("draggable", true);
        environmentsWindow.prepend(environmentWrapper);
        let bedroomButton = document.createElement("div");
        bedroomButton.classList.add("bedroom");
        environmentWrapper.appendChild(bedroomButton);
        let bedroomButtonText = document.createElement("p");
        bedroomButtonText.classList.add("bedroom-button-text");
        bedroomButtonText.innerText = this.name;
        environmentWrapper.appendChild(bedroomButtonText);

        bedroomButton.addEventListener("click", () => {
            document.body.classList.add("no-blur");
            document.body.style.backgroundImage = "url(./media/images/bedroom.jpg)";
            localStorage.setItem("chosenEnvironment", "bedroom");
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

                bedroomProducts.sort((a, b) => {
                    const labelA = lang === 'en' ? a.en : a.pt;
                    const labelB = lang === 'en' ? b.en : b.pt;
                    return labelA.localeCompare(labelB);
                });

                for (const product of bedroomProducts) {
                    if (this.products.includes(product.id)) {
                        let element = document.createElement("button");
                        element.classList.add("environment-preference-button", "bedroomFunctionality");
                        element.innerText = lang === 'en' ? product.en : product.pt;
                        environmentsWindow.appendChild(element);

                        if (product.id == "addBedroomAC") {
                            this.AC(element);
                        }
                        else if (product.id == "addBedroomWindows") {
                            this.windows(element);
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