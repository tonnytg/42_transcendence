import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Invite");
    }

    async getHtml() {
        return `
            <h1>Invite</h1>
        `;
    }
}
