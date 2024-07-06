import { main as gameMain } from '/static/js/services/game2.js';

export default function Pong() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div class="container my-5">
            <h1 class="text-center">Choose Game Mode</h1>
            <div class="d-flex justify-content-center">
                <button class="btn btn-primary mx-2" id="trainingMode">Training Mode</button>
                <button class="btn btn-primary mx-2" id="soloPlayer">Solo Player</button>
                <button class="btn btn-primary mx-2" id="localPvP">Local PvP</button>
                <button class="btn btn-primary mx-2" id="multiPlayer">MultiPlayer</button>
            </div>
            <canvas id="gameCanvas" class="w-100 h-100" width="800" height="600"></canvas>
        </div>

        <style>
            body {
                font-family: 'Silkscreen', cursive;
            }
            #gameCanvas {
                background-color: black;
            }
        </style>
    `;

    element.addEventListener('DOMNodeInserted', () => {
        document.getElementById('trainingMode').addEventListener('click', () => startGame('TRAINING'));
        document.getElementById('soloPlayer').addEventListener('click', () => startGame('SOLO_PLAYER'));
        document.getElementById('localPvP').addEventListener('click', () => startGame('LOCAL_PVP'));
        document.getElementById('multiPlayer').addEventListener('click', () => startGame('MULTI_PLAYER'));

        gameMain();
    });

    function startGame(mode) {
        window.location.href = 'game.html?mode=' + mode;
    }

    return element;
}
