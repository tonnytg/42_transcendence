class AppHome extends HTMLElement {
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
			<main class="container col-md-5">
					<h2 class="text-white">${user.first_name}</h2>
					<img src="/static/images/logo.png" class="mb-4">
					<p class="lead">Pong brings back the excitement of the classic arcade game! Face off against your friends or challenge the AI in thrilling matches. Customize the visuals with epic backgrounds and show off your skills. Enter the arena and relive the nostalgia in grand style. Play now and become the legend of Pong!</p>
				</main>
			${userAuthenticated ? `
				<div class="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar">
					<ul class="nav nav-pills flex-column mb-auto">
						<li>
							<a href="#" class="nav-link">
								<i class="bi bi-person-circle"></i> Profile
							</a>
						</li>
					</ul>
				</div>

				<div class="container-fluid main-content">
					<div class="row">
						<div class="col">
							<div class="banner bg-dark text-white"></div>
							<div class="d-flex align-items-center mt-3">
								<img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" alt="Profile Picture" class="rounded-circle me-3 profile-img">
								<div>
									<h2 class="text-white">${user.first_name}</h2>
									<p>@username</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			` : `
				<div class="container">
					<div class="d-flex justify-content-center">
						<a href="https://api.intra.42.fr/oauth/authorize?client_id=${clientId42}&redirect_uri=${redirectUri42}&response_type=code" class="btn btn-lg btn-light fw-bold border-white bg-white mt-16 mx-8 p-8">Login 42</a>
						<a href="#" class="btn btn-lg
						btn-light fw-bold border-white bg-white mt-16">Register</a>
					</div>
				</div>
			`}
		`;
	}
}

customElements.define('app-home', AppHome);
