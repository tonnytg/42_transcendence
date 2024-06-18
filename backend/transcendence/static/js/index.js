import { Router } from "./Router.js";
import { Home, Game, Profile, Dashboard, Chat, Invite } from "./views/index.js";
import './components/header.js';
import './components/footer.js';
import './components/homeComponent.js';
import './components/pongGame.js';
import { toggleTheme } from './themeToggle.js';

// Route definitions
const routes = [
    { path: "/", view: Home },
    { path: "/game", view: Game }, // chat, game, invite,
    { path: "/profile", view: Profile },//  dashboard, profile
    { path: "/dashboard", view: Dashboard }, //
    { path: "/chat", view: Chat },
    { path: "/invite", view: Invite },
];

const app = document.querySelector("#app");
const router = new Router(routes);

router.init(app);

window.toggleTheme = toggleTheme;
