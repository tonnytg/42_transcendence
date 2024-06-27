// import apiClient from '../services/api-client.js';
//
// const loginTemplate = document.createElement('template');
// loginTemplate.innerHTML = `
//     <style>
//         .login-container {
//             max-width: 400px;
//             margin: auto;
//             padding: 15px;
//         }
//         .login-form {
//             display: flex;
//             flex-direction: column;
//         }
//         .login-form .form-group {
//             margin-bottom: 15px;
//         }
//         .login-form button {
//             margin-top: 10px;
//         }
//         .text-center {
//             text-align: center;
//         }
//         .logo {
//             width: 60px;
//             height: 60px;
//         }
//     </style>
//     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
// `;
//
// class Login extends HTMLElement {
//     constructor() {
//         super();
//         this.attachShadow({ mode: 'open' });
//     }
//
//     async connectedCallback() {
//         // if (!loginTemplate.content.querySelector('.login-container')) {
//         try {
//             const html = await apiClient.fetch('login-component/');
//             const templateContent = loginTemplate.innerHTML + html;
//             loginTemplate.innerHTML = templateContent;
//         } catch (error) {
//             console.error('Error fetching login template:', error);
//             this.shadowRoot.innerHTML = `<p>Error loading login form</p>`;
//             return;
//             // }
//         }
//         this.shadowRoot.appendChild(loginTemplate.content.cloneNode(true));
//     }
// }

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
        <form id="loginForm" class="login-form">
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
    }

    disconnectedCallback() {
    }
}

customElements.define('app-login', Login);
