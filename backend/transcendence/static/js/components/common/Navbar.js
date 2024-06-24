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
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="../../static/css/style.css">
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
            <nav class="d-flex nav nav-masthead col-md-6 justify-content-center">
                <a class="text-white fw-bold px-2 py-1" href="/game">Game</a>
                <a class="text-white fw-bold px-2 py-1" href="/dashboard">Dashboard</a>
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
