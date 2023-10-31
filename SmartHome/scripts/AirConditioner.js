"use strict";

/**
 * Represents an air conditioner and its various settings.
 */
class AirConditioner {
    /**
     * Creates a new AirConditioner instance.
     * @param {HTMLElement} ACButton - The button element that triggers the air conditioner component.
     * @param {String} context - The context in which the air conditioner operates, 
     * has to be set to either "general" or "environments", set to "general" by default.
     * @param {String} environmentName - The name of the environment the air conditioner is associated with, set to "all environments" by default.
     * @returns {void}
     */
    constructor(ACButton, context = "general", environmentName = "all environments") {
        this._initialValues = {
            ACPowerState: "off",
            notSubmittedACPowerState: "off",
            temperature: "16 ºC",
            notSubmittedTemperature: "16 ºC",
            ACFanSpeed: "2",
            notSubmittedACFanSpeed: "2",
            ACAirFreshener: "Roses",
            notSubmittedACAirFreshener: "Roses",
        };
        this._ACButton = ACButton;
        this._context = context;
        this._environmentName = environmentName;

        // AC elements window
        this._ACWindow = document.createElement("form");
        // AC power button
        this._ACPowerButton = document.createElement("button");
        // AC temperature control window
        this._ACTempWindow = document.createElement("div");
        // AC lower temperature button
        this._ACTempDown = document.createElement("button");
        // AC temperature value display
        this._ACTempDisplay = document.createElement("input");
        // AC raise temperature button
        this._ACTempUp = document.createElement("button");
        // AC fan speed wrapper
        this._ACFanSpeedWrapper = document.createElement("div");
        // AC fan speed element
        this._ACFanSpeed = document.createElement("div");
        // AC air freshener wrapper
        this._ACAirFreshenerWrapper = document.createElement("div");
        // AC air freshener element
        this._ACAirFreshener = document.createElement("select");
        // AC air freshener scents
        this._scentsArray;
        lang == "en" ? this._scentsArray = ["None", "Roses", "Wood", "Lavender", "Pine", "Ocean"] :
            lang == "pt" ? this._scentsArray = ["None", "Rosas", "Madeira", "Lavanda", "Pinho", "Oceano"] : null;
        // AC submit button
        this._ACSubmitButton = document.createElement("button");

        AirConditioner.allInstances.push(this);
        this.initLocalStorage();
        this.createUI();
        this.ACButtonEvent();
        this.incrementTemperature();
        this.decrementTemperature();
        this.toggleACPower();
        this.ACFormSubmission();
    }

    // Static array to keep track of all created AC instances
    static allInstances = [];

    /**
     * Restores air conditioning settings and UI to match localStorage values when returning from
     * AC settings in a given context.
     * Removes the air conditioning window associated with the provided context,
     * and ensures that notSubmitted settings match their respective current values.
     * 
     * This method is static and can be called on the class itself, as it operates on all instances.
     * 
     * @param {String} context - The context for which to restore air conditioning settings.
     * @returns {void}
     */
    static returnFromAC(context) {
        AirConditioner.allInstances.forEach((instance) => {
            if (instance.context == context) {
                if (localStorage.getItem("temperature")) {
                    instance.ACTempDisplay.value = localStorage.getItem("temperature");
                }

                instance.retriveACSettings();
                instance.ACWindow.remove();
            }
        });

        localStorage.setItem("notSubmittedTemperature", localStorage.getItem("temperature"));
        localStorage.setItem("notSubmittedACPowerState", localStorage.getItem("ACPowerState"));
        localStorage.setItem("notSubmittedACFanSpeed", localStorage.getItem("ACFanSpeed"));
        localStorage.setItem("notSubmittedACAirFreshener", localStorage.getItem("ACAirFreshener"));
    }

    /**
     * Get the initial values for the air conditioning settings.
     * @returns {Object} The initial values.
     */
    get initialValues() {
        return this._initialValues;
    }

    /**
     * Get the air conditioning button element.
     * @returns {HTMLElement} The AC button element.
     */
    get ACButton() {
        return this._ACButton
    }

    /**
     * Get the context of this air conditioner instance.
     * @returns {String} The context.
     */
    get context() {
        return this._context;
    }

    /**
     * Get the name of the environment.
     * @returns {String} The environment name.
     */
    get environmentName() {
        return this._environmentName;
    }

    /**
     * Get the air conditioner window element.
     * @returns {HTMLElement} The AC window element.
     */
    get ACWindow() {
        return this._ACWindow;
    }

    /**
     * Get the power button for the air conditioner.
     * @returns {HTMLElement} The AC power button.
     */
    get ACPowerButton() {
        return this._ACPowerButton;
    }

    /**
     * Get the temperature window element of the air conditioner.
     * @returns {HTMLElement} The temperature window element.
     */
    get ACTempWindow() {
        return this._ACTempWindow;
    }

    /**
     * Get the button to decrease the temperature of the air conditioner.
     * @returns {HTMLElement} The temperature down button.
     */
    get ACTempDown() {
        return this._ACTempDown;
    }

    /**
     * Get the display for the current temperature setting of the air conditioner.
     * @returns {HTMLElement} The temperature display element.
     */
    get ACTempDisplay() {
        return this._ACTempDisplay;
    }

    /**
     * Get the button to increase the temperature of the air conditioner.
     * @returns {HTMLElement} The temperature up button.
     */
    get ACTempUp() {
        return this._ACTempUp;
    }

    /**
     * Get the wrapper for the fan speed settings of the air conditioner.
     * @returns {HTMLElement} The fan speed wrapper element.
     */
    get ACFanSpeedWrapper() {
        return this._ACFanSpeedWrapper;
    }

    /**
     * Get the fan speed settings of the air conditioner.
     * @returns {HTMLElement} The fan speed element.
     */
    get ACFanSpeed() {
        return this._ACFanSpeed;
    }

    /**
     * Get the wrapper for the air freshener settings of the air conditioner.
     * @returns {HTMLElement} The air freshener wrapper element.
     */
    get ACAirFreshenerWrapper() {
        return this._ACAirFreshenerWrapper;
    }

    /**
     * Get the air freshener settings of the air conditioner.
     * @returns {HTMLElement} The air freshener element.
     */
    get ACAirFreshener() {
        return this._ACAirFreshener;
    }

    /**
     * Get the air freshener scents array.
     * @returns {String[]} The air freshener scents array.
     */
    get scentsArray() {
        return this._scentsArray;
    }

    /**
     * Get the submit button for the air conditioner settings.
     * @returns {HTMLElement} The submit button.
     */
    get ACSubmitButton() {
        return this._ACSubmitButton;
    }

    /**
     * Initializes the local storage with default values for air conditioner settings.
     * If a setting is not already present in local storage, it is set to its default value.
     * Also ensures that notSubmitted settings match their respective current values initially.
     * @returns {void}
     */
    initLocalStorage() {
        for (const key in this.initialValues) {
            if (!localStorage.getItem(key)) {
                localStorage.setItem(key, this.initialValues[key]);
            }
        }

        localStorage.setItem("notSubmittedTemperature", localStorage.getItem("temperature"));
        localStorage.setItem("notSubmittedACPowerState", localStorage.getItem("ACPowerState"));
        localStorage.setItem("notSubmittedACFanSpeed", localStorage.getItem("ACFanSpeed"));
        localStorage.setItem("notSubmittedACAirFreshener", localStorage.getItem("ACAirFreshener"));
    }

    /**
     * Creates the user interface (UI) elements for this air conditioner instance.
     * Configures and styles various elements such as power button, temperature control,
     * fan speed, and air freshener settings.
     */
    createUI() {
        this.ACWindow.classList.add("AC-window");
        this.ACWindow.style.paddingTop = "0";
        this.ACWindow.style.display = "flex";

        if (this.context == "general") {
            this.ACEnvironmentsSelection = document.createElement("select");
            this.ACEnvironmentsSelection.innerHTML = `<option>All environments</option>`;
            let ACSelectOptionsDefault = JSON.parse(localStorage.getItem('environments')).map(
                environment => `<option>${environment.name}</option>`).join('');
            this.ACEnvironmentsSelection.innerHTML += ACSelectOptionsDefault;
            ACSelectOptionsDefault = this.ACEnvironmentsSelection.innerHTML;
            this.ACEnvironmentsSelection.addEventListener("click", () => {
                const ACSelectOptionsDynamic = `<option>All environments</option>` + JSON.parse(localStorage.getItem('environments')).map(
                    environment => `<option>${environment.name}</option>`).join('');
                if (ACSelectOptionsDynamic != ACSelectOptionsDefault) {
                    this.ACEnvironmentsSelection.style.cursor = "wait";
                    this.ACEnvironmentsSelection.innerHTML = ACSelectOptionsDynamic;
                    ACSelectOptionsDefault = ACSelectOptionsDynamic;
                    setTimeout(() => {
                        this.ACEnvironmentsSelection.style.removeProperty("cursor");
                    }, 1000);
                }
            })
            this.ACWindow.appendChild(this.ACEnvironmentsSelection);
        }

        this.ACTempWindow.classList.add("AC-temp-window");
        this.ACTempWindow.style.display = "flex";
        if (localStorage.getItem("ACPowerState")) {
            this.ACWindow.appendChild(this.ACTempWindow);
        }

        this.ACPowerButton.innerText = "⏻";
        this.ACPowerButton.classList.add("AC-power-button");
        this.ACPowerButton.type = "button";
        this.ACPowerButton.style.display = "flex";
        this.ACPowerButton.style.border = "3px solid red";
        this.ACPowerButton.style.color = "red";
        this.ACWindow.appendChild(this.ACPowerButton);

        this.ACTempDown.innerText = "-";
        this.ACTempDown.classList.add("AC-temp-down");
        this.ACTempDown.type = "button";
        this.ACTempDown.style.display = "flex";
        this.ACTempWindow.appendChild(this.ACTempDown);

        this.ACTempDisplay.classList.add("AC-temp-display");
        this.ACTempDisplay.value = "16 ºC";
        this.ACTempDisplay.readOnly = true;
        this.ACTempDisplay.type = "text";
        this.ACTempWindow.appendChild(this.ACTempDisplay);

        this.ACTempUp.innerText = "+";
        this.ACTempUp.classList.add("AC-temp-up");
        this.ACTempUp.type = "button";
        this.ACTempUp.style.display = "flex";
        this.ACTempWindow.appendChild(this.ACTempUp);

        this.ACFanSpeedWrapper.classList.add("AC-fan-wrapper");
        this.ACFanSpeedWrapper.style.display = "flex";
        this.ACFanSpeedWrapper.style.gap = "10px";
        this.ACFanSpeedWrapper.style.alignItems = "center";

        const ACFanSpeedText = document.createElement("p");
        ACFanSpeedText.classList.add("AC-fan-speed-text");
        if (lang == "en") {
            ACFanSpeedText.innerText = "Fan Speed:"
        }
        else if (lang == "pt") {
            ACFanSpeedText.innerText = "Velocidade da Ventoinha:"
        }
        this.ACFanSpeedWrapper.appendChild(ACFanSpeedText)

        this.ACFanSpeed.classList.add("AC-fan-speed");
        this.ACFanSpeed.style.display = "flex";
        this.ACFanSpeed.innerHTML = `
        <button type="button" class="fan-speed-option" value="1">1</button>
        <button type="button" class="fan-speed-option" value="2">2</button>
        <button type="button" class="fan-speed-option" value="3">3</button>`
        Array.from(this.ACFanSpeed.getElementsByClassName("fan-speed-option")).forEach(option => {
            option.addEventListener("click", () => {

                Array.from(this.ACFanSpeed.getElementsByClassName("fan-speed-option")).forEach(option => {
                    option.style.removeProperty("background");
                    option.style.removeProperty("color");
                });

                option.style.background = "green";
                option.style.color = "white";
                this.updateSubmitButtonVisibility();
                localStorage.setItem("notSubmittedACFanSpeed", option.value);
                this.updateSubmitButtonVisibility();
            });
        })
        this.ACFanSpeedWrapper.appendChild(this.ACFanSpeed);

        this.ACAirFreshenerWrapper.classList.add("AC-air-freshener-wrapper");
        this.ACAirFreshenerWrapper.style.display = "flex";
        this.ACAirFreshenerWrapper.style.gap = "10px";
        this.ACAirFreshenerWrapper.style.alignItems = "center";

        const ACAirFreshenerText = document.createElement("p");
        ACAirFreshenerText.classList.add("AC-air-freshener-text");
        if (lang == "en") {
            ACAirFreshenerText.innerText = "Air Freshener Scent:"
        }
        else if (lang == "pt") {
            ACAirFreshenerText.innerText = "Aroma do Ambientador:"
        }
        this.ACAirFreshenerWrapper.appendChild(ACAirFreshenerText)

        this.ACAirFreshener.classList.add("AC-air-freshener");
        this.ACAirFreshener.style.display = "flex";
        this.ACAirFreshener.innerHTML = `
            <option value="None">${this.scentsArray[0]}</option>
            <option value="Roses">${this.scentsArray[1]}</option>
            <option value="Wood">${this.scentsArray[2]}</option>
            <option value="Lavender">${this.scentsArray[3]}</option>
            <option value="Pine">${this.scentsArray[4]}</option>
            <option value="Ocean">${this.scentsArray[5]}</option>
        `
        this.ACAirFreshenerWrapper.addEventListener("input", () => {
            localStorage.setItem("notSubmittedACAirFreshener", this.ACAirFreshener.value);
            this.updateSubmitButtonVisibility();
        })
        this.ACAirFreshenerWrapper.appendChild(this.ACAirFreshener);

        if (lang == "en") {
            this.ACSubmitButton.innerText = "Apply";
        } else if (lang == "pt") {
            this.ACSubmitButton.innerText = "Aplicar";
        }
        this.ACSubmitButton.classList.add("AC-submit-button");
        this.ACSubmitButton.type = "submit";
        this.ACWindow.appendChild(this.ACSubmitButton);

        // Check local storage to maintain previously selected AC temperature if page is refreshed
        if (localStorage.getItem("temperature")) {
            this.ACTempDisplay.value = localStorage.getItem("temperature");
        }

        this.retriveACSettings();
        this.updateSubmitButtonVisibility();
    }

    ACButtonEvent() {
        // Event listener for the AC button
        if (this.context == "general") {
            this.ACButton.addEventListener("click", () => {
                preferencesOuterWindow.style.animation = "blur-transition-out 0.15s";
                setTimeout(() => {
                    preferencesOuterWindow.style.animation = "blur-transition-in 0.15s";
                    setTimeout(() => {
                        preferencesOuterWindow.style.removeProperty("animation");
                    }, 150);
                    preferencesElements.forEach(element => {
                        element.style.display = "none";
                    });
                    preferencesWindow.appendChild(this.ACWindow);
                    this.ACFanSpeed.querySelectorAll(".fan-speed-option")[parseInt(localStorage.getItem("ACFanSpeed")) - 1].click();
                    this.ACAirFreshener.value = localStorage.getItem("ACAirFreshener");
                    this.updateSubmitButtonVisibility();
                    preferencesWindow.style.display = "flex";
                    preferencesReturnButton.style.removeProperty("display");
                    if (lang === 'en') {
                        preferencesText.innerHTML = "<p>Air Conditioner</p>";
                    }
                    else if (lang === 'pt') {
                        preferencesText.innerHTML = "<p>Ar-Condicionado</p>";
                    }
                    preferencesText.style.marginLeft = "45px";
                    preferencesReturnButton.style.marginTop = "10px";
                }, 150);
            });
        }
        else if (this.context == "environments") {
            this.ACButton.addEventListener("click", () => {
                environmentsOuterWindow.style.animation = "blur-transition-out 0.15s";
                setTimeout(() => {
                    environmentsOuterWindow.style.animation = "blur-transition-in 0.15s";
                    setTimeout(() => {
                        environmentsOuterWindow.style.removeProperty("animation");
                    }, 150);
                    document.querySelectorAll(".environment-preference-button").forEach(element => {
                        element.style.display = "none";
                    });
                    environmentsWindow.appendChild(this.ACWindow);
                    this.ACFanSpeed.querySelectorAll(".fan-speed-option")[parseInt(localStorage.getItem("ACFanSpeed")) - 1].click();
                    this.ACAirFreshener.value = localStorage.getItem("ACAirFreshener");
                    this.updateSubmitButtonVisibility();
                    if (lang === 'en') {
                        environmentsText.innerHTML = `<p>Air Conditioner</p><p class='subp'>Applies only to "${this.environmentName}".</span>`;
                    }
                    else if (lang === 'pt') {
                        environmentsText.innerHTML = `<p>Ar-Condicionado</p><p class='subp'>Aplica-se apenas à "${this.environmentName}".</span>`;
                    }
                }, 150);
            });
        }
    }

    toggleACPower() {
        this.ACPowerButton.addEventListener("click", () => {
            if (this.ACPowerButton.style.color == "green") {
                // Show the confirmation message when turning the AC off
                this.ACPowerButton.style.border = "3px solid red";
                this.ACPowerButton.style.color = "red";
                this.ACTempWindow.remove();
                this.ACFanSpeedWrapper.remove();
                this.ACAirFreshenerWrapper.remove();
                this.updateSubmitButtonVisibility();
                localStorage.setItem("notSubmittedACPowerState", "off");
                this.updateSubmitButtonVisibility();
            } else {
                // Show the confirmation message when turning the AC on
                this.ACPowerButton.style.border = "3px solid green";
                this.ACPowerButton.style.color = "green";
                this.ACWindow.insertBefore(this.ACTempWindow, this.ACSubmitButton);
                this.ACWindow.insertBefore(this.ACFanSpeedWrapper, this.ACSubmitButton);
                this.ACWindow.insertBefore(this.ACAirFreshenerWrapper, this.ACSubmitButton);
                this.updateSubmitButtonVisibility();
                localStorage.setItem("notSubmittedACPowerState", "on");
                this.updateSubmitButtonVisibility();
            }
        });
    }

    incrementTemperature() {
        this.ACTempUp.addEventListener("click", () => {
            if (parseInt(this.ACTempDisplay.value.split(" ")[0]) < 30) {
                this.ACTempDisplay.value = parseInt(this.ACTempDisplay.value.split(" ")[0]) + 1 + " ºC";
                localStorage.setItem("notSubmittedTemperature", this.ACTempDisplay.value);
                this.updateSubmitButtonVisibility();
            }
        });
    }

    decrementTemperature() {
        this.ACTempDown.addEventListener("click", () => {
            if (parseInt(this.ACTempDisplay.value.split(" ")[0]) > 16) {
                this.ACTempDisplay.value = parseInt(this.ACTempDisplay.value.split(" ")[0]) - 1 + " ºC";
                localStorage.setItem("notSubmittedTemperature", this.ACTempDisplay.value);
                this.updateSubmitButtonVisibility();
            }
        });
    }

    ACFormSubmission() {
        this.ACWindow.addEventListener("submit", event => {
            event.preventDefault()
            let dialog;
            let acceptDialog;
            let declineDialog;
            let confirmationMessage;
            if (lang == "en") {
                dialog = "Are you sure you want to change the AC settings?";
                acceptDialog = "Change AC settings";
                declineDialog = "Do not change AC settings";
                confirmationMessage = "The AC settings were successfully changed";
            }
            else if (lang == "pt") {
                dialog = "Tem certeza que quer mudar as configurações do AC?";
                acceptDialog = "Mudar configurações do AC";
                declineDialog = "Não mudar configurações do AC";
                confirmationMessage = "As configurações de AC foram alteradas com sucesso";
            }
            showConfirmationDialog(dialog, acceptDialog, declineDialog, "negative",
                this.context, (this.context == "environments" ? environmentsOuterWindow : preferencesOuterWindow), confirmationMessage, () => {
                    if (this.ACPowerButton.style.color == "green") {
                        localStorage.setItem("ACPowerState", "on");
                        localStorage.setItem("temperature", localStorage.getItem("notSubmittedTemperature"));
                        localStorage.setItem("ACFanSpeed", localStorage.getItem("notSubmittedACFanSpeed"));
                        localStorage.setItem("ACAirFreshener", localStorage.getItem("notSubmittedACAirFreshener"));
                        this.retriveACSettings();
                    }
                    else {
                        localStorage.setItem("ACPowerState", "off");
                        this.retriveACSettings();
                    }
                    this.updateSubmitButtonVisibility();
                }
            )
        });
    }

    retriveACSettings() {
        if (localStorage.getItem("ACPowerState")) {
            if (localStorage.getItem("ACPowerState") == 'on') {
                this.ACPowerButton.style.border = "3px solid green";
                this.ACPowerButton.style.color = "green";
                this.ACWindow.insertBefore(this.ACTempWindow, this.ACSubmitButton);
                this.ACWindow.insertBefore(this.ACFanSpeedWrapper, this.ACSubmitButton);
                this.ACWindow.insertBefore(this.ACAirFreshenerWrapper, this.ACSubmitButton);
                this.updateSubmitButtonVisibility();

                if (lang == "en") {
                    document.getElementById("AC-stats-text").innerText =
                        `AC On, Temperature: ${localStorage.getItem("temperature")}, \
                        Fan speed: ${localStorage.getItem("ACFanSpeed")}, Set scent: \
                        ${localStorage.getItem("ACAirFreshener")}`;
                }
                else if (lang == "pt") {
                    let scentNameInPortuguese;
                    if (localStorage.getItem("ACAirFreshener") == "None") {
                        scentNameInPortuguese = this.scentsArray[0];
                    }
                    if (localStorage.getItem("ACAirFreshener") == "Roses") {
                        scentNameInPortuguese = this.scentsArray[1];
                    }
                    else if (localStorage.getItem("ACAirFreshener") == "Wood") {
                        scentNameInPortuguese = this.scentsArray[2];
                    }
                    else if (localStorage.getItem("ACAirFreshener") == "Lavender") {
                        scentNameInPortuguese = this.scentsArray[3];
                    }
                    else if (localStorage.getItem("ACAirFreshener") == "Pine") {
                        scentNameInPortuguese = this.scentsArray[4];
                    }
                    else if (localStorage.getItem("ACAirFreshener") == "Ocean") {
                        scentNameInPortuguese = this.scentsArray[5];
                    }

                    document.getElementById("AC-stats-text").innerText =
                        `AC Ligado, Temperatura: ${localStorage.getItem("temperature")}, \
                        Velocidade da ventoinha: ${localStorage.getItem("ACFanSpeed")}, Aroma definido: \
                        ${scentNameInPortuguese}`;
                }
            }
            else {
                this.ACPowerButton.style.border = "3px solid red";
                this.ACPowerButton.style.color = "red";
                this.ACTempWindow.remove();
                this.ACAirFreshenerWrapper.remove()
                this.ACFanSpeedWrapper.remove();
                this.updateSubmitButtonVisibility();

                localStorage.setItem("ACPowerState", "off");
                localStorage.setItem("notSubmittedACPowerState", "off");
                localStorage.setItem("temperature", localStorage.getItem("temperature"));
                localStorage.setItem("notSubmittedTemperature", localStorage.getItem("temperature"));
                localStorage.setItem("ACFanSpeed", localStorage.getItem("ACFanSpeed"));
                localStorage.setItem("notSubmittedACFanSpeed", localStorage.getItem("ACFanSpeed"));
                localStorage.setItem("ACAirFreshener", localStorage.getItem("ACAirFreshener"));
                localStorage.setItem("notSubmittedACAirFreshener", localStorage.getItem("ACAirFreshener"));

                if (lang == "en") {
                    document.getElementById("AC-stats-text").innerText = `AC Off`;
                } else if (lang == "pt") {
                    document.getElementById("AC-stats-text").innerText = `AC Desligado`;
                }
            }
        }
    }

    updateSubmitButtonVisibility() {
        if (localStorage.getItem("notSubmittedACPowerState") == "off" && localStorage.getItem("ACPowerState") == "off") {
            this.ACSubmitButton.setAttribute("disabled", true);
            this.ACSubmitButton.innerText = "No changes to apply";
        }
        else if (localStorage.getItem("notSubmittedTemperature") != localStorage.getItem("temperature") ||
            localStorage.getItem("notSubmittedACPowerState") != localStorage.getItem("ACPowerState") ||
            localStorage.getItem("notSubmittedACFanSpeed") != localStorage.getItem("ACFanSpeed") ||
            localStorage.getItem("notSubmittedACAirFreshener") != localStorage.getItem("ACAirFreshener")) {
            this.ACSubmitButton.removeAttribute("disabled");
            this.ACSubmitButton.innerText = "Apply";
        } else {
            this.ACSubmitButton.setAttribute("disabled", true);
            this.ACSubmitButton.innerText = "No changes to apply";
        }
    }
}