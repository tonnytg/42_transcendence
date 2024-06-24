import AbstractView from "./AbstractView.js";

export class Home extends AbstractView {
    constructor() {
        super();
        this.setTitle("Home");
    }

    async getHtml() {
        return `
        <app-card-login></app-card-login>
        `;
    }
}

