import AbstractView from "./AbstractView.js";

export class Home extends AbstractView {
    constructor() {
        super();
        this.setTitle("Home");
    }

    async getHtml() {
        return `
        <link rel="stylesheet" href="/static/css/style.css">
        <app-card-login></app-card-login>
        `;
    }
}

