import AbstractView from "./AbstractView.js";

export class Game extends AbstractView {
    constructor() {
        super();
        this.setTitle("Game");
    }

    async getHtml() {
        const responseHtml = await fetch("/static/js/services/2dpong/index.html");
        const htmlContent = await responseHtml.text();

        const responseJs = await fetch("/static/js/services/2dpong/pong.js");
        const jsContent = await responseJs.text();

        const scriptElement = `<script>${jsContent}</script>`;

        return htmlContent.replace('</body>', `${scriptElement}</body>`);
    }
}
