"use strict";

/**
 * Creates and displays a form for setting a routine activity on a specific day and time,
 * and whether the activity will be at home or not.
 * This function generates an HTML form for adding an activity to a routine. 
 * The form allows users to specify the activity name, the time at which it should occur, 
 * and whether it will be at home or not. It checks for overlapping activities in
 * local storage and alerts the user if an activity is already scheduled for the specified time. 
 * If no overlaps are detected, the activity is added to the routine and stored in local storage.
 *
 * @param {String} day - A day of the week, either in English or Portuguese, on which to set the activity.
 * @returns {void}
 */
function makeRoutineForm(day) {
    if (day == "Sunday" || day == "Domingo") {
        day = 0;
    } else if (day == "Monday" || day == "Segunda-feira") {
        day = 1;
    } else if (day == "Tuesday" || day == "Terça-feira") {
        day = 2;
    } else if (day == "Wednesday" || day == "Quarta-feira") {
        day = 3;
    } else if (day == "Thursday" || day == "Quinta-feira") {
        day = 4;
    } else if (day == "Friday" || day == "Sexta-feira") {
        day = 5;
    } else if (day == "Saturday" || day == "Sábado") {
        day = 6;
    }

    // Create the form element
    const form = document.createElement('form');
    form.id = 'activity-form';

    // Create input fields for activity name, time, and location choice
    form.innerHTML = `
        <div class="form-group">
            <input type="text" id="activity-name" maxlength="50" placeholder="" required>
            <label for="activity-name">${lang == "en" ? 'Activity name' : lang == "pt" ? 'Nome da atividade' : null}:</label>
        </div>
        <div>
            <label for="time">${lang == "en" ? 'Time' : lang == "pt" ? 'Hora' : null}:</label>
            <input type="time" id="activity-time" required>
        </div>
        <div>
            <label for="activity-location">${lang == "en" ? 'Location' : lang == "pt" ? 'Localização' : null}:</label>
            <select id="activity-location" required>
                <option value="home">${lang == "en" ? 'At home' : lang == "pt" ? 'Em casa' : null}</option>
                <option value="outside">${lang == "en" ? 'Outside' : lang == "pt" ? 'Fora de casa' : null}</option>
            </select>
        </div>
        <button type="submit" style="background: green; color: white;" disabled>
            ${lang == "en" ? 'Create Activity' : lang == "pt" ? 'Criar Atividade' : null}
        </button>`;


    form.addEventListener('input', event => {
        if (document.getElementById('activity-name').value.trim().length != 0 && document.getElementById('activity-time').value.length != 0) {
            form.getElementsByTagName('button')[0].disabled = false;
        }
        else {
            form.getElementsByTagName('button')[0].disabled = true;
        }
    })
    // Add an event listener to handle the form submission
    form.addEventListener('submit', event => {
        event.preventDefault();

        // Get input values
        const activityName = document.getElementById('activity-name').value;
        const time = document.getElementById('activity-time').value;
        const location = document.getElementById('activity-location').value;

        let dialog;
        let acceptDialog;
        let declineDialog;
        let confirmationMessage;
        if (lang == "en") {
            dialog = `Are you sure you want to add "${activityName}" to your routine?`;
            acceptDialog = `Add "${activityName}" to my routine`;
            declineDialog = `Do not add "${activityName}" to my routine`;
            confirmationMessage = `"${activityName}" was successfully added to your routine`;
        }
        else if (lang == "pt") {
            dialog = `Tem certeza que quer adicionar "${activityName}" à sua rotina?`;
            acceptDialog = `Adicionar "${activityName}" à minha rotina`;
            declineDialog = `Não adicionar "${activityName}"  à minha rotina`;
            confirmationMessage = `"${activityName}" foi adicionado a sua rotina`;
        }

        // Check for overlapping activities
        const activities = JSON.parse(localStorage.getItem('activities') || '[]');
        const overlap = activities.some(activity => {
            return activity.day === day && activity.time === time;
        });

        if (overlap) {
            const confirmationBox = document.createElement("div");
            confirmationBox.className = "confirmation-box";

            routineOuterWindow.appendChild(confirmationBox);

            routineText.style.display = routineReturnButton.style.display = routine.style.display = "none";

            let overlapMessage;
            if (lang == "en") {
                overlapMessage = `The activity "${activityName}" cannot be created, you have another activity already set for this hour`;
            }
            else if (lang == "pt") {
                overlapMessage = `A atividade "${activityName}" não pode ser criada, já existe uma outra atividade marcada para este horário`;
            }

            confirmationBox.innerHTML = `<p style = "font-size: x-large;">${overlapMessage}</p>
            <br>
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 512 512">
            <line x1="368" y1="368" x2="144" y2="144" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
            <line x1="368" y1="144" x2="144" y2="368" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>
            `

            setTimeout(() => {
                confirmationBox.remove()
                routineText.style.removeProperty("display");
                routineReturnButton.style.removeProperty("display");
                routine.style.removeProperty("display");
            }, 5000);

        }
        else {
            showConfirmationDialog(dialog, acceptDialog, declineDialog, "positive",
                "routine", routineOuterWindow, confirmationMessage, () => {
                    // Add the activity to the list
                    activities.push({
                        activityName,
                        day,
                        time,
                        location,
                    });

                    // Update local storage
                    localStorage.setItem('activities', JSON.stringify(activities));
                    displayActivitiesForNext24Hours();

                });
        }
    });

    // Append the form to the "routine" element
    document.getElementById("define-routine-wrapper").appendChild(form);
}