class Footer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.5.0/font/bootstrap-icons.min.css" rel="stylesheet">
            <style>
                footer {
                    position: realtive;
                    bottom: 0;
                    width: 100vw;
                    padding: 10px 0;
                }
            </style>
            <footer class="mt-auto text-white-50">
                <div class="container d-flex justify-content-between align-content-center">
                    <p>42 Transcendence <a href="https://42.fr/" class="text-white">Vila Éramos 6</a></p>
                </div>
            </footer>
        `;

        // this.shadowRoot.querySelector('#toggle-theme-btn').addEventListener('click', () => {
        //     window.toggleTheme();
        // });
    }
}

customElements.define('app-footer', Footer);
