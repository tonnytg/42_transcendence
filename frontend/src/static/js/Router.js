// static/js/router.js
class Router {
    constructor(routes) {
        this.routes = routes;
        this._loadInitialRoute();
    }

    loadRoute(...urlSegments) {
        const matchedRoute = this._matchUrlToRoute(urlSegments);

        if (!matchedRoute) {
            console.error('No route matched:', urlSegments);
            return;
        }

        const url = `/${urlSegments.join('/')}`;
        history.pushState({}, '', url);

        const routerOutlet = document.querySelector('#app');
        routerOutlet.innerHTML = '';

        const view = new matchedRoute.view();
        routerOutlet.appendChild(view);
    }

    init(app) {
        this.app = app;
        window.addEventListener('popstate', () => {
            this.loadRoute(...location.pathname.split('/').filter(part => part));
        });

        this._loadInitialRoute();
    }

    _matchUrlToRoute(urlSegments) {
        return this.routes.find(route => {
            const routePathSegments = route.path.split('/').filter(part => part);
            if (routePathSegments.length !== urlSegments.length) {
                return false;
            }
            return routePathSegments.every((routePart, i) => routePart === urlSegments[i]);
        });
    }

    _loadInitialRoute() {
        const pathNameSplit = window.location.pathname.split('/');
        const pathSegments = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : [''];

        this.loadRoute(...pathSegments);
    }
}

export { Router };
