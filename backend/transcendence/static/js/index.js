import { handleRouting, handleNavigation } from "./router.js";
import { handleAuthActions } from "./services/auth.js";



const addEventListeners = () => {
    document.body.addEventListener("click", (e) => {
        handleNavigation(e);
    });

    window.addEventListener("popstate", handleRouting);
}

const initializeEventListeners = () => {
    document.addEventListener("DOMContentLoaded", () => {
        addEventListeners();
        handleRouting();
    });
}

initializeEventListeners();