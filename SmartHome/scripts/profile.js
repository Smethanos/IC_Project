"use strict"

function onButtonClick() {
    alert('Button clicked!');
}

const button = document.querySelector('button');
button.addEventListener('click', onButtonClick);

const newButton = document.createElement('button');
newButton.textContent = 'Click me!';
document.body.appendChild(newButton);

newButton.addEventListener('click', () => {
    alert('New button clicked!');
});