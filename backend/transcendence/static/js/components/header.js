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
                                <img src="https://avataaars.io/?avatarStyle=Circle&topType=NoHair&accessoriesType=Blank&facialHairType=BeardMajestic&facialHairColor=Black&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Serious&skinColor=DarkBrown" alt="mdo" width="64" height="64" class="rounded-circle fw-bold border-white">
                            </a>
                            <span class="fw-bold text-white">Bem-vindo(a),&nbsp;&nbsp;${userName}!</span>
                        </div>
                        <nav class="nav nav-masthead col-md-6 justify-content-center">
                            <a class="nav-link fw-bold px-2 py-1 active" aria-current="page" href="/">Home</a>
                            <a class="nav-link fw-bold px-2 py-1" href="/game">Game</a>
                            <a class="nav-link fw-bold px-2 py-1" href="/invite">Friends</a>
                            <a class="nav-link fw-bold px-2 py-1" href="/chat">Chat</a>
                            <a class="nav-link fw-bold px-2 py-1" href="/dashboard">Dashboard</a>
                            <a class="nav-link fw-bold px-2 py-1" href="#">Profile</a>
                        </nav>
                        <div class="d-flex align-items-center">
                            <form method="post" action="{% url 'logout' %}">
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
