"use strict";

/**
 * Represents windows and blinds.
 */
class Windows {
    constructor(windowsButton, context = "general", environmentName = "all environments") {
        this._windowsButton = windowsButton;
        this._context = context;
        this._environmentName = environmentName;

        // Windows elements window
        this._windowsWindow = document.createElement("form");

        Windows.allInstances.push(this);
        this.createUI();
        this.windowsButtonEvent();
    }

    // Static array to keep track of all created Windows instances
    static allInstances = [];

    static returnFromWindows(context) {
        Windows.allInstances.forEach((instance) => {
            if (instance.context == context) {
                // TODO
                instance.windowsWindow.remove();
            }
        });
    }

    get windowsButton() {
        return this._windowsButton;
    }

    get windowsWindow() {
        return this._windowsWindow;
    }

    get context() {
        return this._context;
    }

    get environmentName() {
        return this._environmentName;
    }

    /**
     * Creates the user interface (UI) elements for this Windows instance.
     */
    createUI() {
        this.windowsWindow.classList.add("windows-window");
        this.windowsWindow.style.paddingTop = "0";
        this.windowsWindow.style.display = "flex";
        this.windowsWindow.innerHTML = "My windows and blinds 🪟";

        if (this.context == "general") {
            this.windowsEnvironmentsSelection = document.createElement("select");
            this.windowsEnvironmentsSelection.innerHTML = `<option>All environments</option>`;
            let windowsSelectOptionsDefault = JSON.parse(localStorage.getItem('environments')).map(
                environment => `<option>${environment.name}</option>`).join('');
            this.windowsEnvironmentsSelection.innerHTML += windowsSelectOptionsDefault;
            windowsSelectOptionsDefault = this.windowsEnvironmentsSelection.innerHTML;
            this.windowsEnvironmentsSelection.addEventListener("click", () => {
                const windowsSelectOptionsDynamic = `<option>All environments</option>` + JSON.parse(localStorage.getItem('environments')).map(
                    environment => `<option>${environment.name}</option>`).join('');
                if (windowsSelectOptionsDynamic != windowsSelectOptionsDefault) {
                    this.windowsEnvironmentsSelection.style.cursor = "wait";
                    this.windowsEnvironmentsSelection.innerHTML = windowsSelectOptionsDynamic;
                    windowsSelectOptionsDefault = windowsSelectOptionsDynamic;
                    setTimeout(() => {
                        this.windowsEnvironmentsSelection.style.removeProperty("cursor");
                    }, 1000);
                }
            })
            this.windowsWindow.appendChild(this.windowsEnvironmentsSelection);
        }
    }

    windowsButtonEvent() {
        // Event listener for the windows button
        if (this.context == "general") {
            this.windowsButton.addEventListener("click", () => {
                preferencesOuterWindow.style.animation = "blur-transition-out 0.15s";
                setTimeout(() => {
                    preferencesOuterWindow.style.animation = "blur-transition-in 0.15s";
                    setTimeout(() => {
                        preferencesOuterWindow.style.removeProperty("animation");
                    }, 150);
                    preferencesElements.forEach(element => {
                        element.style.display = "none";
                    });
                    preferencesWindow.appendChild(this.windowsWindow);
                    preferencesWindow.style.display = "flex";
                    preferencesReturnButton.style.removeProperty("display");
                    if (lang === 'en') {
                        preferencesText.innerHTML = "Windows";
                    }
                    else if (lang === 'pt') {
                        preferencesText.innerHTML = "Janelas";
                    }
                    preferencesText.style.marginLeft = "45px";
                }, 150);
            });
        } else if (this.context == "environments") {
            this.windowsButton.addEventListener("click", () => {
                environmentsOuterWindow.style.animation = "blur-transition-out 0.15s";
                setTimeout(() => {
                    environmentsOuterWindow.style.animation = "blur-transition-in 0.15s";
                    setTimeout(() => {
                        environmentsOuterWindow.style.removeProperty("animation");
                    }, 150);
                    document.querySelectorAll(".environment-preference-button").forEach(element => {
                        element.style.display = "none";
                    });
                    environmentsWindow.appendChild(this.windowsWindow);
                    environmentsWindow.style.display = "flex";
                    environmentsReturnButton.style.removeProperty("display");
                    if (lang === 'en') {
                        environmentsText.innerHTML = "Windows";
                    }
                    else if (lang === 'pt') {
                        environmentssText.innerHTML = "Janelas";
                    }
                    environmentsText.style.marginLeft = "45px";
                }, 150);
            });
        }
    }
}