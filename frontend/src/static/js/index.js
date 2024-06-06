import { handleRouting, handleNavigation } from "./router.js";
import { handleAuthActions } from "./services/auth.js";

/**
 * Adds event listeners for navigation and authentication actions.
 *
 * Attaches a click event listener to the document body to handle navigation and
 * authentication actions.
 * Attaches a popstate event listener to the window to handle browser history
 * navigation.
 */
const addEventListeners = () => {
    document.body.addEventListener("click", (e) => {
        handleNavigation(e);
        handleAuthActions(e);
    });

    window.addEventListener("popstate", handleRouting);
}

/**
 * Initializes event listeners after the DOM content is loaded and handles
 * initial routing.
 *
 * Adds event listeners for navigation and authentication actions, as well as
 * for popstate events. Calls handleRouting to set up the initial route.
 */
const initializeEventListeners = () => {
    document.addEventListener("DOMContentLoaded", () => {
        addEventListeners();
        handleRouting();
    });
}

initializeEventListeners();
