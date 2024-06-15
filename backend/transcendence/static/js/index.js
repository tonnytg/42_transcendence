import { Router } from "./Router.js";
import { Home, Game, Profile, Dashboard, Chat, Invite } from "./views/index.js";
import './components/header.js';
import './components/footer.js';


// Route definitions
const routes = [
    { path: "/", view: Home },
    { path: "/game", view: Game },
    { path: "/profile", view: Profile },
    { path: "/dashboard", view: Dashboard },
    { path: "/chat", view: Chat },
    { path: "/invite", view: Invite },
];

const app = document.querySelector("#app");
const router = new Router(routes);

router.init(app);
