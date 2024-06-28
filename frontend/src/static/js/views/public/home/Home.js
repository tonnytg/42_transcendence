import { navigateTo } from '../../../router.js';

export default function Home() {
    const element = document.createElement('div');
    element.innerHTML = `
        <style>
            .home {
                font-family: Arial, sans-serif;
            }
            .button {
                padding: 10px 20px;
                background-color: #007BFF;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin-right: 10px;
            }
        </style>
        <div class="home">
            <h1>Home Page</h1>
            <button id="aboutButton" class="button">Go to About Page</button>
            <button id="loginButton" class="button">Login with 42</button>
        </div>
    `;

    element.querySelector('#aboutButton').addEventListener('click', () => {
        navigateTo('/about');
    });

    const handleButtonLogin = () => {
        const authUrl = `https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-949c9204ce2bacc41d9143cdcb52e5152e57d57686ef9cad4cfbe996f15a106e&redirect_uri=http%3A%2F%2Flocalhost%3A80%2Fcallback&response_type=code`;
        window.location.href = authUrl;
    };

    element.querySelector('#loginButton').addEventListener('click', handleButtonLogin);

    return element;
}
