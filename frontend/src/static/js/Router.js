// import Home from './views/public/home/Home.js';
import About from './views/public/about/About.js';
import Dashboard from './views/private/dashboard/Dashboard.js';
import Pong from './views/private/pong/Pong.js';
import LiveChat from './views/private/chat/Chat.js';

export function Router() {
    const root = document.getElementById('root');
    root.innerHTML = '';  // Clear the root element

    const path = window.location.pathname;
    let component;

    switch (path) {
        case '/':
            component = LiveChat();
            // component = Home();
            break;
        case '/about':
            component = About();
            break;
        case '/dashboard':
            component = Dashboard();
            break;
        case '/pong':
            component = Pong();
            break;
        default:
            component = document.createElement('div');
            component.textContent = 'Page not found';
    }

    root.appendChild(component);
}

export function navigateTo(url) {
    history.pushState(null, null, url);
    Router();
}
