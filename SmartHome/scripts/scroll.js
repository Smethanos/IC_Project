"use strict";

let container;
if (document.body.id == "SmartHomePage") {
    container = environmentsWindow;
}   
else if (document.body.id == "SmartHomeGroceriesPage") {
    container = storesWindow;
}
let paddles = document.getElementsByClassName('paddles')[0];
let leftButton = document.getElementsByClassName('left-paddle')[0];
let rightButton = document.getElementsByClassName('right-paddle')[0];

/**
 * Updates the visibility of left and right scroll buttons based on the container's scroll position.
 * If there's enough content to scroll to the left, the left button is displayed; otherwise, it is hidden.
 * If there's enough content to scroll to the right, the right button is displayed; otherwise, it is hidden.
 * 
 * @param {void}
 * @returns {void}
 */
function updateScrollButtonVisibility() {
    // Timeout delay to prevent button from needlessly staying after an abrupt resize
    setTimeout(() => {
        // Check if there's enough content to scroll to the left
        leftButton.style.display = container.scrollLeft > 0 ? 'block' : 'none';

        // Check if there's enough content to scroll to the right
        rightButton.style.display = container.scrollWidth - 1 >= container.clientWidth + container.scrollLeft ? 'block' : 'none';
    }, 300);
}

/**
 * Sets up a MutationObserver to watch for changes in the container's child elements. When child elements
 * are added or removed, this function triggers an update to the visibility of the left and right scroll buttons.
 * 
 * @param {void}
 * @returns {void}
 */
function observeContainerChanges() {
    // Create a MutationObserver to watch for changes in the container's child elements
    let observer = new MutationObserver(function (mutationsList) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Child elements have changed, update button visibility
                updateScrollButtonVisibility();
            }
        }
    });

    // Start observing container changes
    observer.observe(container, { childList: true, subtree: true });
}

updateScrollButtonVisibility(); // Initial check
observeContainerChanges();

container.addEventListener('scroll', updateScrollButtonVisibility);

leftButton.onclick = function () {
    sideScroll(container, 'left', 25, 100, 12);
};

rightButton.onclick = function () {
    sideScroll(container, 'right', 25, 100, 12);
};

/**
 * Initiates horizontal scrolling within the specified element in the given direction.
 * 
 * @param {HTMLElement} element - The element to be scrolled horizontally.
 * @param {String} direction - The direction of scrolling ('left' or 'right').
 * @param {Number} speed - The speed of scrolling in milliseconds.
 * @param {Number} distance - The distance to scroll in pixels.
 * @param {Number} step - The step size for each scroll operation in pixels.
 * @returns {void}
 */
function sideScroll(element, direction, speed, distance, step) {
    let scrollAmount = 0;
    let slideTimer = setInterval(function () {
        if (direction == 'left') {
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
            window.clearInterval(slideTimer);
        }
    }, speed);
}

// Listen for window resize event to update button visibility
window.addEventListener('resize', updateScrollButtonVisibility);