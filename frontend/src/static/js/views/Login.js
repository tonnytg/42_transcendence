import AbstractView from "./AbstractView.js";

export class Login extends AbstractView {
    constructor() {
        super();
        this.setTitle("Login");

        console.log("teste 1");
    }

    async getHtml() {
        const api = document.apiClient;
        const html = await api.fetch('header-component');
        return html;
    }
}
