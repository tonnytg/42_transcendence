class Router {
    constructor(routes) {
        this.routes = routes;
        this.handleRouting = this.handleRouting.bind(this);
        this.handleNavigation = this.handleNavigation.bind(this);
    }

    async loadInitialRoute() {
        const path = window.location.pathname;
        await this.navigateTo(path, false);
    }

    async navigateTo(path, addToHistory = true) {
        const currentPath = window.location.pathname;
        if (addToHistory && currentPath !== path) {
            window.history.pushState({}, '', path);
        }
        await this.handleRouting();
    }

    async redirectTo(path) {
        window.history.replaceState({}, '', path);
        await this.handleRouting();
    }

    findRoute(path) {
        const potentialMatches = this.routes.map(route => ({
            route: route,
            isMatch: path === route.path
        }));

        let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)
            || { route: this.routes[0], isMatch: true };

        return match.route;
    }

    async handleRouting() {
        const path = window.location.pathname;
        const match = this.findRoute(path);

        const view = new match.view();
        this.app.innerHTML = await view.getHtml();
    }

    handleNavigation(event) {
        if (event.target.matches("[data-link]")) {
            event.preventDefault();
            const href = event.target.getAttribute('href');
            this.navigateTo(href);
        }
    }

    addEventListeners() {
        window.addEventListener('popstate', this.handleRouting);
        document.body.addEventListener('click', this.handleNavigation);
    }

    init(app) {
        this.app = app;
        document.addEventListener("DOMContentLoaded", () => {
            this.loadInitialRoute();
            this.addEventListeners();
        });
    }
}

export { Router };
