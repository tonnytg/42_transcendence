const template = document.createElement('template');
template.innerHTML = `
    <style>
        .nav-masthead {
            display: flex;
            justify-content: center;
        }

        .nav-link {
            font-weight: bold;
            padding: 0.5rem 1rem;
            color: white;
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

class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.links = this.shadowRoot.querySelectorAll('[data-link]');
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    connectedCallback() {
        this.addLinkEvents();
    }

    disconnectedCallback() {
        this.removeLinkEvents();
    }

    addLinkEvents() {
        this.links.forEach(link => {
            link.addEventListener('click', this.handleLinkClick);
        });
    }

    removeLinkEvents() {
        this.links.forEach(link => {
            link.removeEventListener('click', this.handleLinkClick);
        });
    }

    handleLinkClick(event) {
        event.preventDefault();
        const path = event.currentTarget.getAttribute('href');
        window.router.navigateTo(path);
    }
}

customElements.define('app-nav', NavBar);
