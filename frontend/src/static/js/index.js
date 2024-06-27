import { Router } from "./Router.js";
import { Home, Game, Profile, Dashboard, Chat, Invite } from "./views/index.js";
import { ApiClient } from "./services/index.js";

const apiClient = new ApiClient('http://localhost:8000/api');
document.apiClient = apiClient;

import "./components/index.js";

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

window.router = router;
router.init(app);
