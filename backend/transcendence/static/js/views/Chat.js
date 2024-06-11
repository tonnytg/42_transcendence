import AbstractView from "./AbstractView.js";

export class Chat extends AbstractView {
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
