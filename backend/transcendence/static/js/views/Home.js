import AbstractView from "./AbstractView.js";

export class Home extends AbstractView {
    constructor() {
        super();
        this.setTitle("Home");
    }

    async getHtml() {
        return `
                <main class="container col-md-5">
                    <img src="/static/images/logo.png" class="mb-4">
                    <p class="lead">Pong brings back the excitement of the classic arcade game! Face off against your friends or challenge the AI in thrilling matches. Customize the visuals with epic backgrounds and show off your skills. Enter the arena and relive the nostalgia in grand style. Play now and become the legend of Pong!</p>
                </main>
                `
    }
}

