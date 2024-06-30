import { Router } from './router.js';
import { handleCallback } from './services/callbackHandler.js';
import './components/header/navigation-bar.js';
// import './services/game.js';

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
