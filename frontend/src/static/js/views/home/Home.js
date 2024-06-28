class Home extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                @import './Home.css';
            </style>
            <h1> Home </h1>
            <div class="home-page">
                <h1>Home Page</h1>
                <form id="home-form">
                    <input type="text" id="input-field" placeholder="Type something...">
                    <button type="submit">Submit</button>
                </form>
                <p id="response-message"></p>
            </div>
        `;

        this.handleGetInfoFromBackend = this.handleGetInfoFromBackend.bind(this);
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#home-form').addEventListener('submit', this.handleGetInfoFromBackend);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#home-form').removeEventListener('submit', this.handleGetInfoFromBackend);
    }

    handleGetInfoFromBackend(event) {
        event.preventDefault();
        const inputField = this.shadowRoot.querySelector('#input-field');
        const responseMessage = this.shadowRoot.querySelector('#response-message');
        const inputValue = inputField.value.trim();

        if (inputValue) {
            responseMessage.textContent = `You submitted: ${inputValue}`;
            inputField.value = '';
        } else {
            responseMessage.textContent = 'Please enter something.';
        }
    }
}

customElements.define('home-page', Home);

export { Home };
