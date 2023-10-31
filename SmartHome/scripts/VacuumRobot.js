"use strict";

/**
 * Represents a vacuum robot and its various settings.
 */
class VacuumRobot {
    constructor() {
        this._vacuumRobotButton = document.getElementById("vacuum-robot");

        // Vacuum roboot elements window
        this._vacuumRobotWindow = document.createElement("form");
        // Vacuum roboot environments selection
        this._vacuumEnvironmentsSelection = document.createElement('select');
        // Vacuum robot power button
        this._vacuumRobotPowerButton = document.createElement("button");

        this.createUI();
        this.vacuumRobotButtonEvent();
        this.toggleVacuumRobotPower();
    }

    get vacuumRobotButton() {
        return this._vacuumRobotButton;
    }

    get vacuumEnvironmentsSelection() {
        return this._vacuumEnvironmentsSelection;
    }

    get vacuumRobotWindow() {
        return this._vacuumRobotWindow;
    }

    get vacuumRobotPowerButton() {
        return this._vacuumRobotPowerButton;
    }

    /**
     * Creates the user interface (UI) elements for this vacuum robot instance.
     * Configures and styles various elements such as the power button.
     */
    createUI() {
        this.vacuumRobotWindow.id = "vacuum-robot-window";
        this.vacuumRobotWindow.style.paddingTop = "0";
        this.vacuumRobotWindow.style.display = "flex";

        let environmentSelectionText = document.createElement('p');
        environmentSelectionText.innerText = lang == "en" ? "Send vacuum robot to:" :
        lang == "pt" ? "Enviar o robô aspirador para:" : null;
        this.vacuumRobotWindow.appendChild(environmentSelectionText);

        let vacuumSelectOptionsDefault = JSON.parse(localStorage.getItem('environments')).map(
            environment => `<option>${environment.name}</option>`).join('');
        this.vacuumEnvironmentsSelection.innerHTML = `${vacuumSelectOptionsDefault}`;
        vacuumSelectOptionsDefault = this.vacuumEnvironmentsSelection.innerHTML;
        this.vacuumEnvironmentsSelection.addEventListener("click", () => {
            const selectOptionsDynamic = JSON.parse(localStorage.getItem('environments')).map(
                environment => `<option>${environment.name}</option>`).join('');
            if (selectOptionsDynamic != vacuumSelectOptionsDefault) {
                this.vacuumEnvironmentsSelection.style.cursor = "wait";
                this.vacuumEnvironmentsSelection.innerHTML = `${selectOptionsDynamic}`;
                vacuumSelectOptionsDefault = selectOptionsDynamic;
                setTimeout(() => {
                    this.vacuumEnvironmentsSelection.style.removeProperty("cursor");
                }, 1000);
            }
        })
        this.vacuumRobotWindow.appendChild(this.vacuumEnvironmentsSelection);

        this.vacuumRobotPowerButton.id = "vacuum-robot-power-button";
        this.vacuumRobotPowerButton.innerText = "⏻";
        this.vacuumRobotPowerButton.type = "button";
        this.vacuumRobotPowerButton.style.display = "flex";
        this.vacuumRobotPowerButton.style.border = "3px solid red";
        this.vacuumRobotPowerButton.style.color = "red";
        this.vacuumRobotWindow.appendChild(this.vacuumRobotPowerButton);
    }

    vacuumRobotButtonEvent() {
        // Event listener for the vacuum robot button
        this.vacuumRobotButton.addEventListener("click", () => {
            preferencesOuterWindow.style.animation = "blur-transition-out 0.15s";
            setTimeout(() => {
                preferencesOuterWindow.style.animation = "blur-transition-in 0.15s";
                setTimeout(() => {
                    preferencesOuterWindow.style.removeProperty("animation");
                }, 150);
                preferencesElements.forEach(element => {
                    element.style.display = "none";
                });
                preferencesWindow.appendChild(this.vacuumRobotWindow);
                preferencesWindow.style.display = "flex";
                preferencesReturnButton.style.removeProperty("display");
                if (lang === 'en') {
                    preferencesText.innerHTML = "Vacuum Robot";
                }
                else if (lang === 'pt') {
                    preferencesText.innerHTML = "Robô Aspirador";
                }
                preferencesText.style.marginLeft = "45px";
            }, 150);
        });
    }

    toggleVacuumRobotPower() {
        this.vacuumRobotPowerButton.addEventListener("click", () => {
            if (this.vacuumRobotPowerButton.style.color == "green") {
                // Show the confirmation message when turning the AC off
                this.vacuumRobotPowerButton.style.border = "3px solid red";
                this.vacuumRobotPowerButton.style.color = "red";
            } else {
                // Show the confirmation message when turning the AC on
                this.vacuumRobotPowerButton.style.border = "3px solid green";
                this.vacuumRobotPowerButton.style.color = "green";
            }
        });
    }
}