class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const userAuthenticated = this.getAttribute('user-authenticated') === 'true';
        const userName = this.getAttribute('user-name');
        const clientId42 = this.getAttribute('client-id-42');
        const redirectUri42 = this.getAttribute('redirect-uri-42');
        const csrfToken = this.getAttribute('csrf-token');

        this.shadowRoot.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center">
                    ${userAuthenticated ? `
                    <div class="d-flex align-items-center">
                        <a href="#" class="d-block link-body-emphasis text-decoration-none" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="mdo" width="64" height="64" class="rounded-circle fw-bold border-white">
                        </a>
                        <span class="fw-bold text-dark">Bem-vindo(a), ${userName}!</span>
                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <nav class="navbar navbar-expand-lg navbar-dark">
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link fw-bold" aria-current="page" href="/">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link fw-bold" href="/game">Game</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link fw-bold" href="/invite">Friends</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link fw-bold" href="/chat">Chat</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link fw-bold" href="/dashboard">Dashboard</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link fw-bold" href="#">Profile</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div class="d-flex align-items-center">
                        <form method="post" action="/logout">
                            <input type="hidden" name="csrfmiddlewaretoken" value="${csrfToken}">
                            <button type="submit" class="btn btn-lg btn-light fw-bold border-white bg-white mt-16">Logout</button>
                        </form>
                    </div>
                    ` : `
                    <div class="d-flex align-items-center">
                        <a href="https://api.intra.42.fr/oauth/authorize?client_id=${clientId42}&redirect_uri=${redirectUri42}&response_type=code" class="btn btn-lg btn-light fw-bold border-white bg-white mt-16 mx-8 p-8">Login 42</a>
                        <a href="#" class="btn btn-lg btn-light fw-bold border-white bg-white mt-16">Register</a>
                    </div>
                    `}
                </div>
            </div>
        `;
    }
}

customElements.define('app-header', AppHeader);
