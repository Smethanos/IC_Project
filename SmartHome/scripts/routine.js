"use strict";

// Creating return button for general preferences
let routineReturnButton = document.createElement("button");
routineReturnButton.innerHTML = `<svg class="svg-icon" 
style="width: 1em; margin: auto; transform: scale(1.2); display: flex; 
height: 1em;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" 
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
routineReturnButton.classList.add("return-button");

// Appending button to the website
routineOuterWindow.appendChild(routineReturnButton);
routineReturnButton.style.display = "none";

// Days of the week
let days;
let fullDayNames;
if (lang == "en") {
    days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    fullDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
}
else if (lang == "pt") {
    days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    fullDayNames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
}

let dayFullNameElement = document.createElement("div");

// Add a click event listener to the "set-routine-button"
setRoutineButton.addEventListener("click", () => {
    routineOuterWindow.style.animation = "blur-transition-out 0.15s";
    setTimeout(() => {
        routineOuterWindow.style.animation = "blur-transition-in 0.15s";
        setTimeout(() => {
            routineOuterWindow.style.removeProperty("animation");
        }, 150);
        if (!localStorage.getItem('activities')) {
            routine.innerText = "";
        }
        setRoutineButton.style.display = "none";
        routineReturnButton.style.removeProperty("display");
        routine.style.flexWrap = "wrap";

        if (document.getElementById("no-activities-message")) {
            document.getElementById("no-activities-message").remove();
        }

        let defineRoutineWrapper = document.createElement("div");
        defineRoutineWrapper.id = "define-routine-wrapper";

        let daysOfWeekWrapper = document.createElement("div");
        daysOfWeekWrapper.id = "days-of-week-wrapper";

        routine.appendChild(daysOfWeekWrapper);

        // Loop through the days and create buttons
        for (let i = 0; i < days.length; i++) {
            const day = days[i];
            const button = document.createElement("button");
            button.classList.add("routine-day");
            button.textContent = day;
            daysOfWeekWrapper.appendChild(button);

            routine.appendChild(defineRoutineWrapper);

            button.addEventListener("click", () => {
                if (button.style.background == "green") {
                    defineRoutineWrapper.innerHTML = "";
                    button.style.removeProperty("background");
                    button.style.removeProperty("color");
                    return;
                }

                // Clear the routine when a new day is clicked
                defineRoutineWrapper.innerHTML = "";

                Array.from(document.getElementsByClassName("routine-day")).forEach(dayButton => {
                    dayButton.style.removeProperty("background");
                    dayButton.style.removeProperty("color");
                });

                button.style.color = "white";
                button.style.background = "green";

                // Create dayFullNameElement if it doesn't exist
                if (!dayFullNameElement) {
                    dayFullNameElement = document.createElement("p");
                }

                if (lang == "en") {
                    dayFullNameElement.textContent = `${fullDayNames[i]}'s Routine:`;
                }
                else if (lang == "pt") {
                    if (fullDayNames[i] == "Domingo" || fullDayNames[i] == "Sábado") {
                        dayFullNameElement.textContent = `Rotina do ${fullDayNames[i]}:`;
                    }
                    else {
                        dayFullNameElement.textContent = `Rotina da ${fullDayNames[i]}:`;
                    }
                }
                defineRoutineWrapper.appendChild(dayFullNameElement);

                makeRoutineForm(fullDayNames[i]);
            });
        }

        preferencesOuterWindow.style.display = "none";
        environmentsOuterWindow.style.display = "none";
        ACStats.style.display = "none";
        routineText.style.marginLeft = "45px";
        updateScrollButtonVisibility();
    }, 150);
});

routineReturnButton.addEventListener("click", () => {
    routineOuterWindow.style.animation = "blur-transition-out 0.15s";
    setTimeout(() => {
        routineOuterWindow.style.animation = "blur-transition-in 0.15s";
        setTimeout(() => {
            routineOuterWindow.style.removeProperty("animation");
        }, 150);
        if (document.getElementById("define-routine-wrapper")) {
            showConfirmationDialog(lang == "en" ? 'Are you sure you want to return without adding this activity to your routine?' :
                lang == "pt" ? 'Tem certeza que quer voltar sem adicionar esta atividade à sua rotina?' : null,
                lang == "en" ? 'Yes' :
                    lang == "pt" ? 'Sim' : null, lang == "en" ? 'No' :
                lang == "pt" ? 'Não' : null, "negative", "routine", routineOuterWindow).then((result) => {
                    if (result == "Yes") {
                        preferencesOuterWindow.style.removeProperty("display");
                        environmentsOuterWindow.style.removeProperty("display");
                        ACStats.style.removeProperty("display");
                        routineReturnButton.style.display = "none";
                        setRoutineButton.style.removeProperty("display");
                        routine.style.removeProperty("flex-wrap");

                        for (const button of Array.from(document.getElementsByClassName("routine-day"))) {
                            button.remove();
                        }

                        routine.innerHTML = "";

                        // After cleaning routine's innedHTML append the "set-routine-button" element back to the "routine" element
                        routineOuterWindow.insertBefore(setRoutineButton, routine);
                        displayActivitiesForNext24Hours();

                        routineText.style.marginLeft = "5px";

                        if (dayFullNameElement) {
                            dayFullNameElement.remove();
                            dayFullNameElement = null;
                        }

                        updateScrollButtonVisibility();
                    }
                    else {
                        return;
                    }
                });
        } else {
            preferencesOuterWindow.style.removeProperty("display");
            environmentsOuterWindow.style.removeProperty("display");
            ACStats.style.removeProperty("display");
            routineReturnButton.style.display = "none";
            setRoutineButton.style.removeProperty("display");
            routine.style.removeProperty("flex-wrap");

            for (const button of Array.from(document.getElementsByClassName("routine-day"))) {
                button.remove();
            }

            routine.innerHTML = "";

            // After cleaning routine's innedHTML append the "set-routine-button" element back to the "routine" element
            routineOuterWindow.insertBefore(setRoutineButton, routine);
            displayActivitiesForNext24Hours();

            routineText.style.marginLeft = "5px";

            if (dayFullNameElement) {
                dayFullNameElement.remove();
                dayFullNameElement = null;
            }

            updateScrollButtonVisibility();
        }
    }, 150);
});

/**
 * Displays upcoming activities within the next 24 hours, including an extra 10-minute window
 * after each activity's scheduled time.
 *
 * @param {void}
 * @returns {void}
 */
function displayActivitiesForNext24Hours() {

    let noActivitiesMessage = document.createElement('p');
    noActivitiesMessage.id = "no-activities-message";

    if (!localStorage.getItem('activities')) {
        if (lang === "en") {
            document.getElementById("set-routine-button").innerText = 'Set Routine';
            noActivitiesMessage.innerText = 'No routine defined yet.';
        } else if (lang === "pt") {
            document.getElementById("set-routine-button").innerText = 'Definir Rotina';
            noActivitiesMessage.innerText = 'Nenhuma rotina definida ainda.';
        }

        if (!document.getElementById("no-activities-message") && !document.getElementById("days-of-week-wrapper")) {
            routine.appendChild(noActivitiesMessage);
        }

        return;
    } else {
        if (lang === "en") {
            document.getElementById("set-routine-button").innerText = 'Manage Routine';
        } else if (lang === "pt") {
            document.getElementById("set-routine-button").innerText = 'Gerenciar Rotina';
        }
    }

    const activities = JSON.parse(localStorage.getItem('activities') || '[]');

    // Get the current date and time
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    // Filter activities for the next 24 hours
    const filteredActivities = activities.filter(activity => {
        const activityDay = activity.day;
        const activityTime = activity.time.split(':');
        const activityHour = parseInt(activityTime[0]);
        // Add 10 to have activity in the routine view for 1 hour after its time starts.
        const activityMinutes = parseInt(activityTime[1]) + 10;

        if (activityDay === currentDay) {
            if (
                // Subtract 10 minutes to have the real time.
                (activityHour > currentHour || (activityHour === currentHour && activityMinutes >= currentMinutes) - 10) &&
                (activityHour > currentHour || (activityHour === currentHour && activityMinutes >= currentMinutes))
            ) {
                return true;
            }
        } else if (activityDay > currentDay) {
            return true;
        }

        return false;
    });

    // Display the filtered activities
    Array.from(document.getElementsByClassName("routine-activity")).forEach(activity => {
        activity.remove();
    })

    if (filteredActivities.length === 0) {

        if (lang == "en") {
            noActivitiesMessage.innerText = 'No upcoming activities in the next 24 hours.';
        }
        else if (lang == "pt") {
            noActivitiesMessage.innerText = 'Nenhuma atividade para as próximas 24 horas.';
        }

        if (!document.getElementById("no-activities-message") && !document.getElementById("days-of-week-wrapper")) {
            routine.appendChild(noActivitiesMessage);
        }
    }
    else {
        filteredActivities.forEach(activity => {
            const displayedActivity = document.createElement('div');
            displayedActivity.classList.add("routine-activity");
            let locationText;
            if (lang == "pt") {
                if (activity.location == "home") {
                    locationText = "em casa";
                }
                else {
                    locationText = "fora de casa"
                }
            }
            else if (lang == "en") {
                locationText = activity.location;
            }

            if (lang == "en") {
                displayedActivity.textContent = `${activity.activityName} at ${activity.time}, ${locationText}`;
            }
            else if (lang == "pt") {
                displayedActivity.textContent = `${activity.activityName} às ${activity.time}, ${locationText}`;
            }
            displayedActivity.style.borderRadius = "10px";
            displayedActivity.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
            displayedActivity.style.padding = "10px";
            displayedActivity.style.color = 'white';
            if (isCurrentActivity(activity)) {
                displayedActivity.style.backgroundColor = 'purple';
            }
            routine.prepend(displayedActivity);
        });
    }
}

/**
 * Checks if the given activity is currently ongoing. 
 * All activities within the same hour are then highlighted with a puple background.
 *
 * @param {Object} activity - The activity to be checked, containing 'day' and 'time' properties.
 * @returns {Boolean} True if the activity is currently ongoing; otherwise, false.
 */
function isCurrentActivity(activity) {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    const activityDay = activity.day;
    const activityTime = activity.time.split(':');
    const activityHour = parseInt(activityTime[0]);
    const activityMinutes = parseInt(activityTime[1]);

    return (
        currentDay === activityDay &&
        (
            (currentHour === activityHour && currentMinutes >= activityMinutes) ||
            (currentHour === activityHour && currentMinutes <= activityMinutes)
        )
    );
}

displayActivitiesForNext24Hours();
// Check for activities every 1 minute
setInterval(displayActivitiesForNext24Hours, 60000);
