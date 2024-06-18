import AbstractView from "./AbstractView.js";

export class Dashboard extends AbstractView {
    constructor() {
        super();
        this.setTitle("Dashboard");
    }

    async getHtml() {
        return `
            <h1>Dashboard</h1>
            Link to grafana: <a href="http://localhost:3000">http://localhost:3000</a>
        `;
    }
}
