"use strict";

let lightingButton = document.getElementById("lighting");

let lightingWindow = document.createElement("div");
lightingWindow.id = "lighting-window";
lightingWindow.style.marginBottom = "10px";
lightingWindow.style.display = "flex";
lightingWindow.style.padding = "0";
lightingWindow.style.alignItems = "center";

let lightingEnvironmentsSelection = document.createElement("select");
lightingEnvironmentsSelection.innerHTML = `<option>All environments</option>`;
let lightingSelectOptionsDefault = (JSON.parse(localStorage.getItem('environments')) || []).map(
    environment => `<option>${environment.name}</option>`).join('');
lightingEnvironmentsSelection.innerHTML += lightingSelectOptionsDefault;
lightingSelectOptionsDefault = lightingEnvironmentsSelection.innerHTML;
lightingEnvironmentsSelection.addEventListener("click", () => {
    const lightingSelectOptionsDynamic = `<option>All environments</option>` + (JSON.parse(localStorage.getItem('environments')) || []).map(
        environment => `<option>${environment.name}</option>`).join('');
    if (lightingSelectOptionsDynamic != lightingSelectOptionsDefault) {
        lightingEnvironmentsSelection.style.cursor = "wait";
        lightingEnvironmentsSelection.innerHTML = lightingSelectOptionsDynamic;
        lightingSelectOptionsDefault = lightingSelectOptionsDynamic;
        setTimeout(() => {
            lightingEnvironmentsSelection.style.removeProperty("cursor");
        }, 1000);
    }
})
lightingWindow.appendChild(lightingEnvironmentsSelection);

let lightingIntensityText = document.createElement("p");
lightingIntensityText.id = "lighting-intensity-text";
if (languageSelect.value === 'en') {
    lightingIntensityText.innerText = "Intensity Levels:";
}
else if (languageSelect.value === 'pt') {
    lightingIntensityText.innerText = "Níveis de Intensidade:";
}
lightingIntensityText.style.display = "flex";
lightingWindow.appendChild(lightingIntensityText);

let lightingIntensityWindow = document.createElement("div");
lightingIntensityWindow.id = "lighting-intensity-window";
lightingIntensityWindow.style.display = "flex";
lightingWindow.appendChild(lightingIntensityWindow);

let lighting1 = document.createElement("button");
lighting1.innerHTML = "1";
lighting1.id = "lighting-1";
lighting1.style.display = "flex";
lightingIntensityWindow.appendChild(lighting1);

let lighting2 = document.createElement("button");
lighting2.id = "lighting-2";
lighting2.innerHTML = "2";
lighting2.style.display = "flex";
lightingIntensityWindow.appendChild(lighting2);

let lighting3 = document.createElement("button");
lighting3.innerHTML = "3";
lighting3.id = "lighting-3";
lighting3.style.display = "flex";
lightingIntensityWindow.appendChild(lighting3);

let labelForColorPalette = document.createElement("label");
labelForColorPalette.setAttribute("for", "color-palette");
if (languageSelect.value === 'en') {
    labelForColorPalette.innerText = "Color:";
}
else if (languageSelect.value === 'pt') {
    labelForColorPalette.innerText = "Cor:";
}
lightingWindow.appendChild(labelForColorPalette);

let colorPalette = document.createElement("input");
colorPalette.type = "color";
colorPalette.id = "color-palette"
lightingWindow.appendChild(colorPalette);

if (localStorage.getItem("lightingColor")) {
    document.getElementById("house-name").style.backgroundColor = localStorage.getItem("lightingColor") + "7F";
    colorPalette.value = localStorage.getItem("lightingColor");

    const backgroundColor = getComputedStyle(document.getElementById("house-name")).backgroundColor;
    const textColor = calculateContrastColor(backgroundColor);
    document.getElementById("house-name").style.color = textColor;
}
else {
    colorPalette.value = "#ffffff";
}

// Event listener for the AC button
lightingButton.addEventListener("click", () => {
    preferencesOuterWindow.style.animation = "blur-transition-out 0.15s";
    setTimeout(() => {
        preferencesOuterWindow.style.animation = "blur-transition-in 0.15s";
        setTimeout(() => {
            preferencesOuterWindow.style.removeProperty("animation");
        }, 150);
        preferencesElements.forEach(element => {
            element.style.display = "none";
        });
        if (languageSelect.value === 'en') {
            preferencesText.innerHTML = `<p>Lighting Intensity and Color</p>`;
        }
        else if (languageSelect.value === 'pt') {
            preferencesText.innerHTML = `<p>Intensidade das Luzes e Cores</p>`;
        }
        preferencesWindow.appendChild(lightingWindow);
        preferencesReturnButton.style.removeProperty("display");
        preferencesWindow.style.display = "flex";
        preferencesText.style.marginLeft = "45px";
        preferencesReturnButton.style.marginTop = "10px";
    }, 150);
})

/* diogoF code (help) 
    createUI() {
        }
    load_ui_on_other_places_than_general_context{
        
    }

*/

colorPalette.addEventListener("input", () => {
    localStorage.setItem("lightingColor", colorPalette.value);
    document.getElementById("house-name").style.backgroundColor = localStorage.getItem("lightingColor") + "b3";

    const backgroundColor = getComputedStyle(document.getElementById("house-name")).backgroundColor;
    const textColor = calculateContrastColor(backgroundColor);
    document.getElementById("house-name").style.color = textColor;
})

/**
 * Calculates and returns a contrasting text color based on the provided background color.
 * The function determines the brightness of the background color and suggests 'black' or 'white' as the text color
 * to ensure sufficient contrast for readability.
 *
 * @param {String} backgroundColor - The background color in CSS format (e.g., 'rgb(255, 255, 255)' or '#FFFFFF').
 * @returns {String} - The suggested contrasting text color ('black' or 'white').
 */
function calculateContrastColor(backgroundColor) {
    const rgb = backgroundColor.match(/\d+/g);
    if (rgb) {
        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
        return brightness >= 128 ? 'black' : 'white';
    }
    return 'white';
}