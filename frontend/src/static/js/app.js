import { Router } from './Router.js';
import { handleCallback } from './services/callbackHandler.js';
// import './components/header/navigation-bar.js';

import { NavigationBar } from './components/index.js';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    if (root) {
        const path = window.location.pathname;
        if (path.startsWith('/callback')) {
            handleCallback();
        } else {
            Router();
            window.addEventListener('popstate', Router);
        }
    }
});
