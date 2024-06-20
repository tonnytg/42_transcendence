class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addLinkEvents();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .nav-masthead {
                    display: flex;
                    justify-content: center;
                }

                .nav-link {
                    font-weight: bold;
                    padding: 0.5rem 1rem;
                }
            </style>
            <nav class="nav nav-masthead">
                <a data-link class="nav-link active" aria-current="page" href="/">Home</a>
                <a data-link class="nav-link" href="/game">Game</a>
                <a data-link class="nav-link" href="/invite">Friends</a>
                <a data-link class="nav-link" href="/chat">Chat</a>
                <a data-link class="nav-link" href="/dashboard">Dashboard</a>
                <a data-link class="nav-link" href="#">Profile</a>
            </nav>
        `;
    }

    addLinkEvents() {
        const links = this.shadowRoot.querySelectorAll('[data-link]');
        links.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const path = link.getAttribute('href');
                window.router.navigateTo(path);
            });
        });
    }
}

customElements.define('app-nav', NavBar);
