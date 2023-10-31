"use strict";

// Check local storage to maintain previously selected environment background if page is refreshed
if (localStorage.getItem("chosenEnvironment") && document.body.id != "SmartHomeGroceriesPage") {
    document.body.style.backgroundImage = `url(./media/images/${localStorage.getItem("chosenEnvironment")}.jpg)`;
}

let expandEnvironmentsButton = document.getElementById("expand-environments-button");

// Creating return button for environments
let environmentsReturnButton = document.createElement("button");
environmentsReturnButton.innerHTML = `<svg class="svg-icon" 
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

environmentsReturnButton.classList.add("return-button");
// Appending button to the website
environmentsOuterWindow.appendChild(environmentsReturnButton);
environmentsReturnButton.style.display = "none";

// Event listener for the environments return button
environmentsReturnButton.addEventListener("click", () => {
    // Confirm before returning if there is an AC window form
    if (document.getElementById("environments").querySelector(".AC-submit-button") && 
    document.getElementById("environments").querySelector(".AC-submit-button").disabled != true) {
        showConfirmationDialog(lang == "en" ? 'Are you sure you want to return without applying these AC settings?' :
            lang == "pt" ? 'Tem certeza que quer voltar sem aplicar estas prefêrencias do AC?' : null,
            lang == "en" ? 'Yes' :
                lang == "pt" ? 'Sim' : null, lang == "en" ? 'No' :
            lang == "pt" ? 'Não' : null, "negative", "environments", environmentsOuterWindow).then((result) => {
                if (result == "Yes") {
                    returnToProducts();
                }
                else {
                    return;
                }
            });
    }
    // Confirm before returning if there is an add environment form
    else if (document.getElementById("add-environment-form")) {
        showConfirmationDialog(lang == "en" ? 'Are you sure you want to return without creating this environment?' :
            lang == "pt" ? 'Tem certeza que quer voltar sem criar este ambiente?' : null,
            lang == "en" ? 'Yes' :
                lang == "pt" ? 'Sim' : null, lang == "en" ? 'No' :
            lang == "pt" ? 'Não' : null, "negative", "addEnvironments", environmentsOuterWindow).then((result) => {
                if (result == "Yes") {
                    returnToEnvironments();
                }
                else {
                    return;
                }
            });
    }
    // If returning from products view, return to main environments view
    else if (Array.from(environmentsWindow.getElementsByClassName("environment-preference-button")).some(
        element => getComputedStyle(element).display !== "none") ||
        document.getElementById("add-environments-selection")) {
        returnToEnvironments();
    }
    // If in product view without any forms return without dialogs
    else {
        returnToProducts();
    }
});

/**
 * Returns to the main environments view.
 * This function is called when the user wishes to return from the list of products 
 * of a previously selected environment.
 * 
 * @param {void}
 * @returns {void}
 */
function returnToEnvironments() {
    // Transition animations
    environmentsOuterWindow.style.animation = "blur-transition-out 0.15s";
    setTimeout(() => {
        environmentsOuterWindow.style.animation = "blur-transition-in 0.15s";
        setTimeout(() => {
            environmentsOuterWindow.style.removeProperty("animation");
        }, 150);

        document.body.classList.remove("no-blur");
        Array.from(document.getElementsByClassName("environment")).forEach(element => {
            element.style.removeProperty("display");
        });

        Array.from(document.getElementsByClassName("environment-preference-button")).forEach(element => {
            element.remove();
        });

        if (environmentsWindow.classList.contains("add-environment-window")) {
            expandEnvironmentsButton.click();
            environmentsWindow.classList.remove("add-environment-window");
        }

        addProductsSelection.style.display = "none";
        addEnvironmentForm.remove();

        if (submitEnvironmentButton) {
            submitEnvironmentButton.style.display = "none";
        }

        addEnvironmentForm.style.display = "none";
        document.querySelectorAll(".add-environment-type-button").forEach(element => {
            element.children[0].style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        });
        environmentsReturnButton.style.display = "none";
        environmentsWindow.style.removeProperty("display");
        environmentsWindow.style.removeProperty("justify-content");
        environmentsOuterWindow.style.justifyContent = "space-between";
        expandEnvironmentsButton.style.removeProperty("display");

        setTimeout(() => {
            if (environmentsOuterWindow.style.width != "fit-content") {
                updateScrollButtonVisibility();
            }
        }, 500);

        if (lang === 'en') {
            environmentsText.innerText = "Environments";
        } else if (lang === 'pt') {
            environmentsText.innerText = "Ambientes";
        }
        environmentsText.style.marginLeft = "5px";

    }, 150);
}

/**
 * Returns back to the list of products within a chosen environment.
 * This function is called when the user wishes to return to the list of products
 * after returning from a functionality.
 * 
 * @param {void}
 * @returns {void}
 */
function returnToProducts() {
    // Transition animations
    environmentsOuterWindow.style.animation = "blur-transition-out 0.15s";
    setTimeout(() => {
        environmentsOuterWindow.style.animation = "blur-transition-in 0.15s";
        setTimeout(() => {
            environmentsOuterWindow.style.removeProperty("animation");
        }, 150);

        AirConditioner.returnFromAC("environments");
        Windows.returnFromWindows("environments");

        if (document.getElementById("smart-pantry-functionality-wrapper")) {
            document.getElementById("smart-pantry-functionality-wrapper").remove();
        }

        environmentsText.innerText = localStorage.getItem("chosenEnvironmentName");

        if (localStorage.getItem("chosenEnvironment") == "bedroom") {
            const bedroomProducts = Array.from(environmentsWindow.getElementsByClassName("bedroomFunctionality"));
            bedroomProducts.forEach(element => {
                element.style.removeProperty("display");
            });
        }
        else if (localStorage.getItem("chosenEnvironment") == "bathroom") {
            const bathroomProducts = Array.from(environmentsWindow.getElementsByClassName("bathroomFunctionality"));
            bathroomProducts.forEach(element => {
                element.style.removeProperty("display");
            });
        }
        else if (localStorage.getItem("chosenEnvironment") == "kitchen") {
            const kitchenProducts = Array.from(environmentsWindow.getElementsByClassName("kitchenFunctionality"));
            kitchenProducts.forEach(element => {
                element.style.removeProperty("display");
            });
        }
        else if (localStorage.getItem("chosenEnvironment") == "living-room") {
            const livingRoomProducts = Array.from(environmentsWindow.getElementsByClassName("livingRoomFunctionality"));
            livingRoomProducts.forEach(element => {
                element.style.removeProperty("display");
            });
        }

        environmentsWindow.style.removeProperty("flex-direction");
        environmentsWindow.style.removeProperty("align-items");
        environmentsWindow.style.removeProperty("align-content");
        if (document.getElementById("toaster-functionality-wrapper")) {
            document.getElementById("toaster-functionality-wrapper").remove();
        }
    }, 150);
}

// Expand environments view
expandEnvironmentsButton.addEventListener("click", () => {
    if (environmentsWindow.classList.contains("expanded-environments-view")) {
        environmentsWindow.classList.remove("expanded-environments-view");
        expandEnvironmentsButton.innerHTML =
            `<svg class="svg-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" 
            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M429.9 872.8H218.7l232.1-232.1c17.2-17.2 17.2-45 0-62.2-17.2-17.2-45-17.2-62.2 
            0L152.8 814.2V604.8c0-24.3-19.7-44-44-44s-44 19.7-44 44v312c0 24.3 19.7 44 44 44h321c24.3 
            0 44-19.7 44-44s-19.6-44-43.9-44z m486-808h-321c-24.3 0-44 19.7-44 44s19.7 44 44 44H806l-232.1 
            232c-17.2 17.2-17.2 45 0 62.2 8.6 8.6 19.9 12.9 31.1 12.9 11.3 0 22.5-4.3 31.1-12.9l235.7-235.7v209.4c0 
            24.3 19.7 44 44 44s44-19.7 44-44v-312c0.1-24.2-19.6-43.9-43.9-43.9z"  /></svg>`;
        updateScrollButtonVisibility();
        preferencesOuterWindow.style.removeProperty("display");
        ACStats.style.removeProperty("display");
        routineOuterWindow.style.removeProperty("display");
    }
    else {
        environmentsWindow.classList.add("expanded-environments-view");
        expandEnvironmentsButton.innerHTML =
            `<svg class="svg-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" 
            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M108.8 648.8H320l-232.1 232c-17.2 17.2-17.2 45 0 
            62.2 17.2 17.2 45 17.2 62.2 0l235.7-235.7v209.4c0 24.3 19.7 44 44 44s44-19.7 
            44-44v-312c0-24.3-19.7-44-44-44h-321c-24.3 0-44 19.7-44 44s19.7 44.1 44 44.1z 
            m486-184h321c24.3 0 44-19.7 44-44s-19.7-44-44-44H704.7l232.1-232.1c17.2-17.2 
            17.2-45 0-62.2-8.6-8.6-19.9-12.9-31.1-12.9-11.3 0-22.5 4.3-31.1 12.9L638.8 
            318.2V108.8c0-24.3-19.7-44-44-44s-44 19.7-44 44v312c0 24.3 19.7 44 44 44z"  /></svg>`;
        environmentsWindow.scrollLeft = 0;
        updateScrollButtonVisibility();
        preferencesOuterWindow.style.display = "none";
        ACStats.style.display = "none";
        routineOuterWindow.style.display = "none";
    }
});

// Make environments draggable
let draggedEnvironment = null;

document.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('environment')) {
        draggedEnvironment = e.target;
        e.dataTransfer.setData('text/plain', '');
        e.target.style.opacity = '0.5';
    }
});

document.addEventListener('dragover', (e) => {
    e.preventDefault();
});

document.addEventListener('dragend', (e) => {
    if (e.target.classList.contains('environment')) {
        e.target.style.removeProperty("opacity");
    }
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
    if (draggedEnvironment !== null) {
        const dropTarget = findDropTarget(e.target, draggedEnvironment);
        if (dropTarget) {
            // Check if the drop target has the id "add-environment-wrapper"
            if (dropTarget.id === 'add-environment-wrapper') {
                return; // Prevent the drop operation
            }

            const container = dropTarget.parentElement;
            const draggedIndex = Array.from(container.children).indexOf(draggedEnvironment);
            const dropIndex = Array.from(container.children).indexOf(dropTarget);

            container.insertBefore(draggedEnvironment, dropIndex < draggedIndex ? dropTarget : dropTarget.nextSibling);
        }

        draggedEnvironment = null;
    }

    // Save state
    const childElements = Array.from(document.getElementById('environment-selection').children);

    // Create an array to store the order based on innerText
    const savedOrder = childElements.map(element => {
        return { innerText: element.children[1].innerText };
    });

    // Store the order in local storage
    localStorage.setItem('environmentOrder', JSON.stringify(savedOrder));
});

// Function to find the drop target based on the cursor position
function findDropTarget(target, draggedElement) {
    while (target && !target.classList.contains('environment')) {
        target = target.parentElement;
    }
    if (target === draggedElement) {
        return null;
    }
    return target;
}

// Save order of elements in localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedOrder = JSON.parse(localStorage.getItem('environmentOrder'));

    if (savedOrder) {
        const orderedChildClasses = savedOrder.map(item => item.innerText);

        // Reorganize child elements based on the order in localStorage
        const childElements = Array.from(document.getElementById('environment-selection').children);
        const sortedChildElements = [];

        orderedChildClasses.forEach(text => {
            const matchingElement = childElements.find(element => element.children[1].innerText === text);
            if (matchingElement) {
                sortedChildElements.push(matchingElement);
            }
        });

        // Append the sorted child elements back to the "environment-selection" element
        sortedChildElements.forEach(element => {
            document.getElementById('environment-selection').appendChild(element);
        });
    }
});