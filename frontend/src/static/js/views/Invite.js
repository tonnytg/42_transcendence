import AbstractView from "./AbstractView.js";

export class Invite extends AbstractView {
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
