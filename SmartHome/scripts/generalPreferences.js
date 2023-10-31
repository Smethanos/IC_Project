"use strict";

// Creating return button for general preferences
let preferencesReturnButton = document.createElement("button");
preferencesReturnButton.innerHTML = `<svg class="svg-icon" 
style="width: 1em; margin: auto; transform: scale(1.2); display: flex; 
height: 1em; fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" 
version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M810.666667 469.333333H304.64l154.88-186.026666a42.666667 42.666667 0 
    1 0-65.706667-54.613334l-213.333333 256a50.773333 50.773333 0 0 0-3.84 6.4c0 
    2.133333 0 3.413333-2.986667 5.546667A42.666667 42.666667 0 0 0 170.666667 
    512a42.666667 42.666667 0 0 0 2.986666 15.36c0 2.133333 0 3.413333 2.986667 
    5.546667a50.773333 50.773333 0 0 0 3.84 6.4l213.333333 256A42.666667 
    42.666667 0 0 0 426.666667 810.666667a42.666667 42.666667 0 0 0 
    27.306666-9.813334 42.666667 42.666667 0 0 0 5.546667-60.16L304.64 
    554.666667H810.666667a42.666667 42.666667 0 0 0 0-85.333334z" fill="#FFFFFF" />
</svg>`;

preferencesReturnButton.classList.add("return-button");
// Appending button to the website
preferencesOuterWindow.appendChild(preferencesReturnButton);
preferencesReturnButton.style.display = "none";

function returnToGeneral() {
    preferencesElements.forEach(element => {
        element.style.removeProperty("display");
    })

    AirConditioner.returnFromAC("general");
    generalVacuumRobotInstance.vacuumRobotWindow.remove();
    Windows.returnFromWindows("general");
    lightingWindow.remove();

    chatGPTIframe.remove();
    if (document.getElementById("no-internet-message")) {
        document.getElementById("no-internet-message").remove();
    }
    preferencesReturnButton.style.display = "none";
    preferencesWindow.style.display = "grid";
    updateScrollButtonVisibility();
    if (lang === 'en') {
        preferencesText.innerText = "General";
    }
    else if (lang === 'pt') {
        preferencesText.innerText = "Opções Gerais";
    }
    preferencesText.style.marginLeft = "5px";
    preferencesReturnButton.style.marginTop = "4px";
}

// Event listener for the general preferences return button
preferencesReturnButton.addEventListener("click", () => {
    preferencesOuterWindow.style.animation = "blur-transition-out 0.15s";
    setTimeout(() => {
        preferencesOuterWindow.style.animation = "blur-transition-in 0.15s";
        setTimeout(() => {
            preferencesOuterWindow.style.removeProperty("animation");
        }, 150);
        if (document.getElementById("general-home-preferences").querySelector(".AC-submit-button") &&
            document.getElementById("general-home-preferences").querySelector(".AC-submit-button").disabled != true) {
            showConfirmationDialog(lang == "en" ? 'Are you sure you want to return without applying these AC settings?' :
                lang == "pt" ? 'Tem certeza que quer voltar sem aplicar estas prefêrencias do AC?' : null,
                lang == "en" ? 'Yes' :
                    lang == "pt" ? 'Sim' : null, lang == "en" ? 'No' :
                lang == "pt" ? 'Não' : null, "negative", "general", preferencesOuterWindow).then((result) => {
                    if (result == "Yes") {
                        returnToGeneral();
                    }
                    else {
                        return;
                    }
                });
        }
        else {
            returnToGeneral();
        }
    }, 150);
});

// Make preferences draggable
const preferenceOptions = document.querySelectorAll('.preference');

let draggedItem = null;

preferenceOptions.forEach(preference => {

    preference.addEventListener('dragstart', (e) => {
        draggedItem = preference;
        draggedItem.style.opacity = "0.5";
        e.dataTransfer.setData('text/plain', preference.innerHTML);
    });

    preference.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    preference.addEventListener('dragend', (e) => {
        e.preventDefault();
        if (draggedItem !== null) {
            draggedItem.style.removeProperty("opacity");
        }
    });

    preference.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedItem !== null) {
            if (draggedItem !== preference) {
                // Swap the position of the dragged and drop target preferences
                const parent = preference.parentNode;
                const preferenceIndex1 = Array.from(parent.children).indexOf(draggedItem);
                const preferenceIndex2 = Array.from(parent.children).indexOf(preference);

                if (preferenceIndex1 < preferenceIndex2) {
                    parent.insertBefore(draggedItem, preference.nextSibling);
                } else {
                    parent.insertBefore(draggedItem, preference);
                }
            }
            draggedItem.style.removeProperty("opacity");
            draggedItem = null;
        }

        // Save state
        const childElements = Array.from(document.getElementById('general-home-preferences-selection').children);

        // Create an array to store the order based on innerText
        const savedOrder = childElements.map(element => {
            return { innerText: element.children[1].innerText };
        });

        // Store the order in local storage
        localStorage.setItem('preferencesOrder', JSON.stringify(savedOrder));
    });
});

// Save order of elements in localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedOrder = JSON.parse(localStorage.getItem('preferencesOrder'));

    if (savedOrder) {
        const orderedChildClasses = savedOrder.map(item => item.innerText);

        // Reorganize child elements based on the order in localStorage
        const childElements = Array.from(document.getElementById('general-home-preferences-selection').children);
        const sortedChildElements = [];

        orderedChildClasses.forEach(text => {
            const matchingElement = childElements.find(element => element.children[1].innerText === text);
            if (matchingElement) {
                sortedChildElements.push(matchingElement);
            }
        });

        // Append the sorted child elements back to the "environment-selection" element
        sortedChildElements.forEach(element => {
            document.getElementById('general-home-preferences-selection').appendChild(element);
        });
    }
});