const loginTemplate = document.createElement('template');
loginTemplate.innerHTML = `
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <style>
        .login-container {
            max-width: 400px;
            margin: auto;
            padding: 15px;
        }
        .login-form {
            display: flex;
            flex-direction: column;
        }
        .login-form .form-group {
            margin-bottom: 15px;
        }
        .login-form button {
            margin-top: 10px;
        }
        .text-center {
            text-align: center;
        }
    </style>
    <div class="login-container">
        <form id="loginForm" class="login-form" action="/mfa">
            <div class="form-outline mb-4">
                <input type="email" id="form2Example1" class="form-control" required />
                <label class="form-label" for="form2Example1">Email address</label>
            </div>

            <div class="form-outline mb-4">
                <input type="password" id="form2Example2" class="form-control" required />
                <label class="form-label" for="form2Example2">Password</label>
            </div>

            <div class="row mb-4">
                <div class="col d-flex justify-content-center">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                        <label class="form-check-label" for="form2Example31"> Remember me </label>
                    </div>
                </div>

                <div class="col">
                    <a href="#!">Forgot password?</a>
                </div>
            </div>

            <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>

            <div class="text-center">
                <p>Not a member? <a href="#!">Register</a></p>
                <p>or sign up with:</p>
                <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-facebook-f"></i>
                </button>
                <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-google"></i>
                </button>
                <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-twitter"></i>
                </button>
                <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-github"></i>
                </button>
            </div>
        </form>
    </div>
`;

class Login extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(loginTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#loginForm').addEventListener('submit', this.handleLogin.bind(this));
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#loginForm').removeEventListener('submit', this.handleLogin.bind(this));
    }

    async handleLogin(event) {
        event.preventDefault();
        const email = this.shadowRoot.querySelector('#form2Example1').value;
        const password = this.shadowRoot.querySelector('#form2Example2').value;

        console.log("AQUI");
        try {
            console.log("AQUI");
            const response = await fetch('http://localhost:8000/mfa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            // Process the backend response if necessary
            console.log('Login successful:', result);
        } catch (error) {
            console.error('Error:', error);
            // Handle the error response from the backend
        }
    }

    // handleLogin(event) {
    //     window.router.navigateTo("/mfa");
    // }

    // handleLogin(event) {
    //     event.preventDefault();
    //     const email = this.shadowRoot.querySelector('#form2Example1').value;
    //     const password = this.shadowRoot.querySelector('#form2Example2').value;
    //
    //     // Adicione a lógica de login aqui
    //     alert(`Login clicked\nEmail: ${email}\nPassword: ${password}`);
    // }
}

customElements.define('app-login', Login);
