const homeTemplate = document.createElement('template');
homeTemplate.innerHTML = `
    <style>
    </style>
    <h1>HOME</h1>
`;

class Home extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(homeTemplate.content.cloneNode(true));
    }
}

customElements.define('app-home', Home);
