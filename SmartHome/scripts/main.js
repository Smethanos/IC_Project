"use strict";

// Removing loading animation
window.addEventListener('load', () => {
    document.body.classList.remove("loading-animation")
});

// ---------------------- Most important elements of the website ----------------------

// General preferences elements
let preferencesOuterWindow = document.getElementById("general-home-preferences");
let ACStats = document.getElementById("AC-stats");
let ACStatsText = document.getElementById("AC-stats-text");
let preferencesWindow = document.getElementById("general-home-preferences-selection");
let preferencesElements = Array.from(document.getElementsByClassName("preference"));
let preferencesText = document.getElementById("preferences-text");
if (document.getElementById('groceries')) {
    document.getElementById('groceries').addEventListener('click', () => {
        location.href = 'SmartHomeGroceries.html';
    });
}

// Routine elements
let routineOuterWindow = document.getElementById("routine-window");
let routine = document.getElementById("routine");
let routineText = document.getElementById("routine-text");
let setRoutineButton = document.getElementById("set-routine-button");

// Environments elements
let environmentsOuterOuterWindow = document.getElementById("environments-routine-outer-window");
let environmentsOuterWindow = document.getElementById("environments");
let environmentsWindow = document.getElementById("environment-selection");
let environmentsElements = document.querySelectorAll(".environment");
let environmentsText = document.getElementById("environments-text");

// ------------------------------------- Products ------------------------------------

const bathroomProducts = [
    { id: "addBathroomFlushToilet", en: "Automatic Toilet Flush", pt: "Descarga Automática" },
    { id: "addBathroomLighting", en: "Lighting", pt: "Iluminação" },
    { id: "addBathroomSpeakers", en: "Speakers", pt: "Caixas de Som" },
    { id: "addBathroomWindows", en: "Windows", pt: "Janelas" },
];

const kitchenProducts = [
    { id: "addKitchenAC", en: "Air Conditioning", pt: "Ar-condicionado" },
    { id: "addKitchenCabinets", en: "Cabinets", pt: "Armários" },
    { id: "addKitchenLighting", en: "Lighting", pt: "Iluminação" },
    { id: "addKitchenFridge", en: "Fridge", pt: "Frigorífico" },
    { id: "addKitchenPantry", en: "Pantry", pt: "Dispensa" },
    { id: "addKitchenToaster", en: "Smart Toaster", pt: "Tostadeira Inteligente" },
    { id: "addKitchenTV", en: "TV", pt: "TV" },
    { id: "addKitchenSpeaker", en: "Speakers", pt: "Caixas de Som" },
    { id: "addKitchenWindows", en: "Windows", pt: "Janelas" },
];

const livingRoomProducts = [
    { id: "addLivingRoomAC", en: "Air Conditioning", pt: "Ar-condicionado" },
    { id: "addLivingRoomFireplace", en: "Fireplace", pt: "Lareira" },
    { id: "addLivingRoomLighting", en: "Lighting", pt: "Iluminação" },
    { id: "addLivingRoomSpeakers", en: "Speakers", pt: "Caixas de Som" },
    { id: "addLivingRoomTV", en: "TV", pt: "TV" },
    { id: "addLivingRoomWindows", en: "Windows", pt: "Janelas" },
];

const bedroomProducts = [
    { id: "addBedroomAC", en: "Air Conditioning", pt: "Ar-condicionado" },
    { id: "addBedroomLighting", en: "Lighting", pt: "Iluminação" },
    { id: "addBedroomSpeakers", en: "Speakers", pt: "Caixas de Som" },
    { id: "addBedroomWindows", en: "Windows", pt: "Janelas" },
    { id: "addBedroomTV", en: "TV", pt: "TV" },
    { id: "addBedroomFireplace", en: "Fireplace", pt: "Lareira" },
];

// -------------------------------------------------------------------------------------
// Function to create confirmation dialogs

/**
 * Displays a confirmation dialog box with accept and decline buttons for user interaction.
 *
 * @param {String} dialog - The main message or question displayed in the dialog box.
 * @param {String} acceptDialog - The label for the accept/positive action button.
 * @param {String} declineDialog - The label for the decline/negative action button.
 * @param {String} actionType - The type of action associated with the accept button.
 * @param {String} context - The context of the website in which the dialog is displayed.
 * @param {HTMLElement} elementToAppend - The element to which the confirmation box will be appended.
 * @param {String} confirmationMessage - The message to display after the user confirms the action.
 * @param {Function} onConfirm - The function to execute when the user clicks the accept button.
 * @requires actionType - must be one of the following options: "positive" or "negative".
 * @requires context - must be one of the following options: "general", "routine, "environments", "addEnvironments", or "language".
 * @returns {Promise<String>} - Resolves with "Yes" or "No" based on the user's choice.
 */
async function showConfirmationDialog(
    dialog,
    acceptDialog,
    declineDialog,
    actionType,
    context,
    elementToAppend,
    confirmationMessage = null,
    onConfirm = null
) {
    const confirmationBox = document.createElement("div");
    confirmationBox.className = "confirmation-box";

    confirmationBox.innerHTML = `
        <p style="font-size: x-large;">${dialog}</p>
        <div style="display: flex;">
            <button>${acceptDialog}</button>
            <button>${declineDialog}</button>
        </div>
    `;

    const buttons = confirmationBox.querySelectorAll('button');
    const yesButton = buttons[0];
    const noButton = buttons[1];

    yesButton.style.color = noButton.style.color = "white";
    yesButton.style.paddingRight = yesButton.style.paddingLeft =
        noButton.style.paddingRight = noButton.style.paddingLeft = "15px";

    if (actionType === "positive") {
        yesButton.style.backgroundColor = "green";
        yesButton.style.outline = "-webkit-focus-ring-color auto 1px";
        noButton.style.backgroundColor = "red";
    } else if (actionType === "negative") {
        yesButton.style.backgroundColor = "red";
        noButton.style.backgroundColor = "green";
        noButton.style.outline = "-webkit-focus-ring-color auto 1px";
    }

    if (context === "language") {
        elementToAppend.prepend(confirmationBox);
        document.body.scrollIntoView(false);
    } else {
        // Transition animations
        elementToAppend.style.animation = "blur-transition-out 0.15s";
        setTimeout(() => {
            elementToAppend.style.animation = "blur-transition-in 0.15s";
            setTimeout(() => {
                elementToAppend.style.removeProperty("animation");
            }, 150);
            // Hiding the content inside the window
            if (context === "general" || context == "environments" || context === "addEnvironments" || context === "routine") {
                const hideElements = () => {
                    if (context === "general") {
                        preferencesText.style.display = preferencesReturnButton.style.display =
                            preferencesWindow.style.display = "none";
                    } else if (context === "environments") {
                        environmentsText.style.display = environmentsReturnButton.style.display =
                            environmentsWindow.style.display = expandEnvironmentsButton.style.display = "none";
                    } else if (context === "addEnvironments") {
                        environmentsText.style.display = environmentsReturnButton.style.display =
                            environmentsWindow.style.display = expandEnvironmentsButton.style.display = "none";
                    } else if (context === "routine") {
                        routineText.style.display = routineReturnButton.style.display =
                            routine.style.display = setRoutineButton.style.display = "none";
                    }
                };

                hideElements();
                elementToAppend.appendChild(confirmationBox);
            }
        }, 150);
    }

    return new Promise((resolve) => {
        const callbackYesButton = () => {
            if (!confirmationMessage) {
                confirmationBox.remove();
            }
            else {
                onConfirm();
            }
            confirmationBox.innerHTML = `<p style = "font-size: x-large;">${confirmationMessage}</p>
            <br>
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 512 512">
            <polyline points="416 128 192 384 96 288" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
            </svg>
            `
            document.body.scrollIntoView(false);

            if (context === "language") {
                confirmationBox.innerHTML = `<p style="font-size: x-large;">${confirmationMessage}</p>
                <br>
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 512 512">
                <polyline points="416 128 192 384 96 288" style="fill:none;stroke:green;
                stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
                </svg>
                `;
            }

            if (confirmationMessage) {
                setTimeout(() => {
                    confirmationBox.remove();
                    if (context === "general" || context === "environments" || context === "addEnvironments" || context === "routine") {
                        const showElements = () => {
                            if (context === "general") {
                                preferencesText.style.removeProperty("display");
                                preferencesReturnButton.style.removeProperty("display");
                                preferencesWindow.style.display = "flex";
                            } else if (context === "environments") {
                                environmentsText.style.removeProperty("display");
                                environmentsReturnButton.style.removeProperty("display");
                                expandEnvironmentsButton.style.removeProperty("display");
                                environmentsWindow.style.display = "flex";
                            } else if (context === "addEnvironments") {
                                environmentsText.style.removeProperty("display");
                                environmentsReturnButton.style.removeProperty("display");
                                environmentsWindow.style.removeProperty("display");
                                addEnvironmentForm.remove();
                                returnToEnvironments();
                            } else if (context === "routine") {
                                routineText.style.removeProperty("display");
                                routineReturnButton.style.removeProperty("display");
                                routine.style.removeProperty("display");
                                setRoutineButton.style.removeProperty("display");
                            }
                        };

                        showElements();
                    }
                }, 3000);
            } else {
                confirmationBox.remove();
                if (context === "general" || context === "environments" || context === "addEnvironments" || context === "routine") {
                    const showElements = () => {
                        if (context === "general") {
                            preferencesText.style.removeProperty("display");
                            preferencesReturnButton.style.removeProperty("display");
                            preferencesWindow.style.display = "flex";
                        } else if (context === "environments" || context === "addEnvironments") {
                            environmentsText.style.removeProperty("display");
                            environmentsReturnButton.style.removeProperty("display");
                            if (context === "environments") {
                                environmentsWindow.style.display = "flex";
                                expandEnvironmentsButton.style.removeProperty("display");
                            }
                            else {
                                environmentsWindow.style.removeProperty("display");
                            }
                        } else if (context === "routine") {
                            routineText.style.removeProperty("display");
                            routineReturnButton.style.removeProperty("display");
                            routine.style.removeProperty("display");
                            setRoutineButton.style.removeProperty("display");
                        }
                    };

                    showElements();
                }
            }
            resolve("Yes");
        };

        const callbackNoButton = () => {
            if (!confirmationMessage) {
                confirmationBox.remove();
            }
            else {
                const cancellingMessage = lang === "en" ? "The action was cancelled" : lang === "pt" ? "A ação foi cancelada" : "";

                confirmationBox.innerHTML = `<p style = "font-size: x-large;">${cancellingMessage}</p>
                <br>
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 512 512">
                <line x1="368" y1="368" x2="144" y2="144" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
                <line x1="368" y1="144" x2="144" y2="368" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>
                `
                document.body.scrollIntoView(false);

                if (context == "language") {
                    confirmationBox.innerHTML = `<p style="font-size: x-large;">${cancellingMessage}</p>
                    <br>
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 512 512">
                    <line x1="368" y1="368" x2="144" y2="144" style="fill:none;stroke:red;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
                    <line x1="368" y1="144" x2="144" y2="368" style="fill:none;stroke:red;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
                    </svg>
                    `;
                    languageSelect.value = lang;
                }
            }

            if (confirmationMessage) {
                setTimeout(() => {
                    confirmationBox.remove();
                    if (context === "general" || context === "environments" || context === "addEnvironments" || context === "routine") {
                        const showElements = () => {
                            if (context === "general") {
                                preferencesText.style.removeProperty("display");
                                preferencesReturnButton.style.removeProperty("display");
                                preferencesWindow.style.display = "flex";
                            } else if (context === "environments" || context === "addEnvironments") {
                                environmentsText.style.removeProperty("display");
                                environmentsReturnButton.style.removeProperty("display");
                                environmentsWindow.style.removeProperty("display");
                                if (context == "environments") {
                                    expandEnvironmentsButton.style.removeProperty("display");
                                    environmentsWindow.style.display = "flex";
                                }
                            } else if (context === "routine") {
                                routineText.style.removeProperty("display");
                                routineReturnButton.style.removeProperty("display");
                                routine.style.removeProperty("display");
                            }
                        };

                        showElements();
                    }
                }, 3000);
            } else {
                confirmationBox.remove();
                if (context === "general" || context === "environments" || context === "addEnvironments" || context === "routine") {
                    const showElements = () => {
                        if (context === "general") {
                            preferencesText.style.removeProperty("display");
                            preferencesReturnButton.style.removeProperty("display");
                            preferencesWindow.style.display = "flex";
                        } else if (context === "environments" || context === "addEnvironments") {
                            environmentsText.style.removeProperty("display");
                            environmentsReturnButton.style.removeProperty("display");
                            environmentsWindow.style.removeProperty("display");
                            if (context == "environments") {
                                expandEnvironmentsButton.style.removeProperty("display");
                                environmentsWindow.style.display = "flex";
                            }
                        } else if (context === "routine") {
                            routineText.style.removeProperty("display");
                            routineReturnButton.style.removeProperty("display");
                            routine.style.removeProperty("display");
                        }
                    };

                    showElements();
                }
            }
            resolve("No");
        };

        yesButton.addEventListener("click", callbackYesButton);
        noButton.addEventListener("click", callbackNoButton);
    });
}

// -------------------------------------------------------------------------------------
// Settings

const settingsDiv = document.getElementById("settings");
const settingsToggle = () => {
    if (settingsDiv.style.outline == "green solid 2px") {
        settingsDiv.style.removeProperty("outline");
        Array.from(settingsDiv.children).splice(1).forEach(setting => {
            setting.style.display = "none";
        });
    } else {
        settingsDiv.style.outline = "green solid 2px";
        Array.from(settingsDiv.children).splice(1).forEach(setting => {
            setting.style.display = "unset";
        });
    }
};

settingsDiv.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent the click event from propagating to the document
    settingsToggle();
});

document.getElementById("settings").getElementsByTagName("div")[0].addEventListener("click", () => {
    localStorage.removeItem("environmentOrder");
    localStorage.removeItem("preferencesOrder");
    location.reload();
});

// Add a click event listener to the document
document.addEventListener("click", (event) => {
    if (event.target !== settingsDiv && !settingsDiv.contains(event.target)) {
        // Click is outside the settings div
        settingsDiv.style.removeProperty("outline");
        Array.from(settingsDiv.children).splice(1).forEach(setting => {
            setting.style.display = "none";
        });
    }
});
