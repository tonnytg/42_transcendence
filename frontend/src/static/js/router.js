import Home from "./views/Home.js";
import Login from "./views/Login.js";
import Profile from "./views/Profile.js";

// Definição das rotas
const routes = [
    { path: "/", view: Home },
    { path: "/login", view: Login },
    { path: "/profile", view: Profile },
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
