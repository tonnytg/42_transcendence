class CardLogin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.fetchHeader();
    }

    async fetchHeader() {
        const response = await fetch('http://localhost:8000/api/card-login-component/');
        const html = await response.text();
        this.render(html);
    }

    render(html) {
        this.shadowRoot.innerHTML = `
            ${html}
        `;
    }
}

customElements.define('app-card-login', CardLogin);