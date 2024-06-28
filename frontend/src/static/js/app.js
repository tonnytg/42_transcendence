import { Router } from "./router.js";
import { Home } from "./views/home/Home.js";

const routes = [
    { path: "/", view: Home },
];

const app = document.querySelector("#app");
const router = new Router(routes);

window.router = router;
router.init(app);
