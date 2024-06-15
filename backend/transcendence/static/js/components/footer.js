class AppFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <footer class="mt-auto text-white-50">
                <p>42 Transcendence <a href="https://42.fr/" class="text-white">Vila Éramos 6</a></p>
            </footer>
        `;
    }
}

customElements.define('app-footer', AppFooter);
