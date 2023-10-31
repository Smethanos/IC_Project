"use strict";

/**
 * Represents a Living Room environment with various products.
 */
class LivingRoom {
    /**
     * Creates a new LivingRoom instance.
     * @param {String} name - The name of the living room.
     * @param {String[]} products - An array of products to enable in the living room, the elements that compose the array must 
     * be identical to the name of the id's of the add functionality buttons.
     */
    constructor(name, products) {
        this._name = name;
        this._products = products;
        this.livingRoomButtonEvent();
    }

    get name() {
        return this._name;
    }

    get products() {
        return this._products;
    }

    fireplace(element) {
        // Living Room Fireplace
    }

    TV(element) {
        // Living Room TV
    }

    speakers(element) {
        // Living Room Speakers
    }

    /**
     * Initializes an AirConditioner instance for this Living Room instance.
     * @param {HTMLElement} element - The button element that will triggers 
     * the air conditioner window to be displayed.
     * @returns {void}
     */
    AC(element) {
        // Living Room AC
        let livingRoomACInstance = new AirConditioner(element, "environments", this.name);
    }

    lighting(element) {
        // Living Room Lighting
    }

    windows(element) {
        // Living Room Windows
        let livingRoomWindowsInstance = new Windows(element, "environments", this.name);
    }

    livingRoomButtonEvent() {
        let environmentWrapper = document.createElement("div");
        environmentWrapper.classList.add("environment");
        environmentWrapper.setAttribute("draggable", true);
        environmentsWindow.prepend(environmentWrapper);
        let livingRoomButton = document.createElement("div");
        livingRoomButton.classList.add("living-room");
        environmentWrapper.appendChild(livingRoomButton);
        let livingRoomButtonText = document.createElement("p");
        livingRoomButtonText.classList.add("living-room-button-text");
        livingRoomButtonText.innerText = this.name;
        environmentWrapper.appendChild(livingRoomButtonText);
        
        livingRoomButton.addEventListener("click", () => {
            document.body.classList.add("no-blur");
            document.body.style.backgroundImage = "url(./media/images/living-room.jpg)";
            localStorage.setItem("chosenEnvironment", "living-room");
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
                
                livingRoomProducts.sort((a, b) => {
                    const labelA = lang === 'en' ? a.en : a.pt;
                    const labelB = lang === 'en' ? b.en : b.pt;
                    return labelA.localeCompare(labelB);
                });

                for (const product of livingRoomProducts) {
                    if (this.products.includes(product.id)) {
                        let element = document.createElement("button");
                        element.classList.add("environment-preference-button", "livingRoomFunctionality");
                        element.innerText = lang === 'en' ? product.en : product.pt;
                        environmentsWindow.appendChild(element);

                        if (product.id == "addLivingRoomAC") {
                            this.AC(element);
                        }
                        else if (product.id == "addLivingRoomWindows") {
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