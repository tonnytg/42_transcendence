import AbstractView from "./AbstractView.js";

export class Game extends AbstractView {
    constructor() {
        super();
        this.setTitle("Game");
    }

    async getHtml() {
        return `
            <pong-game> </pong-game>
        `;
    }
}
