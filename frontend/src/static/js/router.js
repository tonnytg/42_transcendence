import Home from "./views/Home.js";
import Game from "./views/Game.js";
import Profile from "./views/Profile.js";
import Dashboard from "./views/Dashboard.js";
import Chat from "./views/Chat.js";
import Invite from "./views/Invite.js"

// Definição das rotas
const routes = [
    { path: "/", view: Home },
    { path: "/game", view: Game },
    { path: "/profile", view: Profile },
    { path: "/dashboard", view: Dashboard },
    { path: "/chat", view: Chat },
    { path: "/invite", view: Invite },
];

// Função do roteador para gerenciar as rotas
export const handleRouting = async () => {
    const potentialMatches = routes.map(route => ({
        route: route,
        isMatch: location.pathname === route.path
    }));

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch) || {
        route: routes[0],
        isMatch: true
    };

    const view = new match.route.view();

    document.querySelector("#app").innerHTML = await view.getHtml();
};

// Função de navegação
export const navigateTo = url => {
    history.pushState(null, null, url);
    handleRouting();
};
