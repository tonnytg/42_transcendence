import { main as gameMain } from '/static/js/services/game.js';

export default function PlayGame() {
    const element = document.createElement('div');
    element.innerHTML = `
        <!-- Navigation bar | Web component -->
        <navigation-bar></navigation-bar>

        <div class="container mt-3">
            <div class="row border border-3 boder-black p-2 canvas-container">
                <!-- Game canvas -->
                <canvas id="gameCanvas" width="800" height="600"></canvas>
            </div>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        body, html {
            height: 100%;
            margin: 0;
            font-family: 'Silkscreen', cursive;
        }
        .canvas-container {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #gameCanvas {
            background-color: black;
            width: 100%;
            height: 100%;
        }
    `;
    document.head.appendChild(style);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    link.integrity = 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Silkscreen&display=swap';
    document.head.appendChild(fontLink);

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fontfaceobserver/2.1.0/fontfaceobserver.standalone.js';
    document.head.appendChild(script);

    element.addEventListener('DOMNodeInserted', () => {
        // Função para obter o parâmetro da URL
        function getParameterByName(name, url = window.location.href) {
            name = name.replace(/[\[\]]/g, '\\$&');
            const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }

        // Obtenha o modo de jogo da URL
        const gameMode = getParameterByName('mode');
        if (gameMode) {
            SETTINGS.GAME_MODE = GAME_MODE[gameMode.toUpperCase()];
        }

        // Inicializa e inicia o jogo
        gameMain();
    });

    return element;
}
