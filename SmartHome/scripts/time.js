"use strict"

let clock = document.getElementById("current-time");

let daysOfWeek;

// The clock is updated every second
setInterval(() => {
    if (lang == 'en') {
        daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    }
    else if (lang == 'pt') {
        daysOfWeek = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    }
    
    let currentDate = new Date();
    let dayOfWeek = daysOfWeek[currentDate.getDay()];
    
    // Helper function to add leading zeros
    const addLeadingZero = (value) => {
        return value.toString().padStart(2, '0');
    };

    let datetime = `${dayOfWeek} \
    ${addLeadingZero(currentDate.getHours())}:${addLeadingZero(currentDate.getMinutes())}:${addLeadingZero(currentDate.getSeconds())}`;

    clock.innerText = datetime;
}, 1000);