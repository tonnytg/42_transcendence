import AbstractView from "./AbstractView.js";

// export default class extends AbstractView {
export class Home extends AbstractView {
    constructor() {
        super();
        this.setTitle("Home");
    }

    async getHtml() {
        return `
            <h1>Home</h1>
        `;
    }
}
// <p>
//     <a href="/game" data-link>Game</a>
// </p>
