import AbstractView from "./AbstractView.js";

export class Home extends AbstractView {
    constructor() {
        super();
        this.setTitle("Home");
    }

    async getHtml() {
        const api = document.apiClient;
        const html = await api.fetch('home-view/');
        return html;
    }
}
