import Home from "./views/Home.js";
import Game from "./views/Game.js";
import Profile from "./views/Profile.js";
import Dashboard from "./views/Dashboard.js";
import Chat from "./views/Chat.js";
import Invite from "./views/Invite.js";

// Route definitions
const routes = [
    { path: "/", view: Home },
    { path: "/game", view: Game },
    { path: "/profile", view: Profile },
    { path: "/dashboard", view: Dashboard },
    { path: "/chat", view: Chat },
    { path: "/invite", view: Invite },
];

/**
 * Router function to handle routing.
 *
 * Maps the defined routes, finds the one matching the current pathname,
 * instantiates the associated view, and updates the content of the element
 * with id "app".
 */
export const handleRouting = async () => {
    const potentialMatches = routes.map(route => ({
        route: route,
        isMatch: location.pathname === route.path
    }));

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)
        || { route: routes[0], isMatch: true };

    const view = new match.route.view();
    document.querySelector("#app").innerHTML = await view.getHtml();
};

/**
 * Navigates to the specified URL and handles routing.
 *
 * @param {string} url - The URL to navigate to.
 */
const navigateTo = url => {
    history.pushState(null, null, url);
    handleRouting();
};

/**
 * Handles navigation by preventing default link behavior and navigating to
 * the target href.
 *
 * @param {Event} e - The event object.
 */
export const handleNavigation = (e) => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        navigateTo(e.target.href);
    }
}
