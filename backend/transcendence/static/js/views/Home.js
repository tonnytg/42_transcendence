import AbstractView from "./AbstractView.js";

export class Home extends AbstractView {
    constructor() {
        super();
        this.setTitle("Home");
    }

    async getHtml() {
            return `
            <AppHome
                user-authenticated="true"
                user-name="user.name"
                client-id-42="client_id"
                redirect-uri-42="redirect_uri"
                csrf-token="csrf_token">
            </AppHome>`;
    }
}

