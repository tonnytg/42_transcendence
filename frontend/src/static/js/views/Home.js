import AbstractView from "./AbstractView.js";

export class Home extends AbstractView {
    constructor() {
        super();
        this.setTitle("Home");
    }

    async getHtml() {
        // const response = await fetch('http://localhost:8000/api/home-view/');
        // const html = await response.text();
        // return html;
        return `<h1>HOME</h1>`;
    }
}

