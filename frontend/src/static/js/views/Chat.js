import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Chat");
    }

    async getHtml() {
        return `
            <h1>Chat</h1>
        `;
    }
}
