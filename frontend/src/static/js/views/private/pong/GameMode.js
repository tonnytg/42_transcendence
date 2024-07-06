import { navigateTo } from '/static/js/Router.js';

export default function GameMode() {
    const playerInfo = JSON.parse(localStorage.getItem('playerInfo')) || { nickname: 'Player 1' };

    const element = document.createElement('div');
    element.innerHTML = `
        <link href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap" rel="stylesheet">
        <!-- Navigation bar | Web component -->
        <div class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <span class="navbar-brand mb-0 h1">${playerInfo.nickname ? `Welcome, ${playerInfo.nickname}` : 'Welcome'}</span>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <button type="button" class="btn btn-link nav-link" onclick="navigateToProfile()">Profile</button>
                    </li>
                </ul>
            </div>
        </div>

        <div class="container mt-3">
            <div class="row border border-3 p-2">
                    <h1 class="text-center">Escolha o Modo de Jogo</h1>
                    <div class="d-flex justify-content-center align-content-center">
                        <button class="btn btn-primary mx-2" onclick="selectGameMode('TRAINING')">Han Solo</button>
                        <button class="btn btn-primary mx-2" onclick="selectGameMode('SOLO_PLAYER')">Versus Skynet</button>
                        <button class="btn btn-primary mx-2" onclick="showPlayerNameInputs('LOCAL_PVP')">Human vs Human</button>
                        <button class="btn btn-primary mx-2" onclick="showPlayerNameInputs('FOUR_PLAYER')">Apocalypse</button>
                    </div>
                    <div id="playerNames" class="mt-3" style="display: none;">
                        <div class="mb-3">
                            <label for="player1Name" class="form-label">Player 1 Name</label>
                            <input type="text" class="form-control" id="player1Name">
                        </div>
                        <div class="mb-3">
                            <label for="player2Name" class="form-label">Player 2 Name</label>
                            <input type="text" class="form-control" id="player2Name">
                        </div>
                        <div id="player34Names" style="display: none;">
                            <div class="mb-3">
                                <label for="player3Name" class="form-label">Player 3 Name</label>
                                <input type="text" class="form-control" id="player3Name">
                            </div>
                            <div class="mb-3">
                                <label for="player4Name" class="form-label">Player 4 Name</label>
                                <input type="text" class="form-control" id="player4Name">
                            </div>
                        </div>
                        <button class="btn btn-success" onclick="startGame()">Start Game</button>
                    </div>
            </div>
        </div>

        <!-- Match over -->
        <div class="modal fade" id="gameOverModal" tabindex="-1" aria-labelledby="gameOverModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="gameOverModalLabel">The match is over!</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Player 1 wins!
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">End game</button>
                        <button type="button" class="btn btn-info" data-bs-dismiss="modal" id="restartGameButton">Restart game</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    window.showPlayerNameInputs = function(mode) {
        document.getElementById('playerNames').style.display = 'block';
        if (mode === 'FOUR_PLAYER') {
            document.getElementById('player34Names').style.display = 'block';
        } else {
            document.getElementById('player34Names').style.display = 'none';
        }
        localStorage.setItem('gameMode', mode);
    };

    window.startGame = function() {
        const player1Name = document.getElementById('player1Name').value || 'Player 1';
        const player2Name = document.getElementById('player2Name').value || 'Player 2';
        const player3Name = document.getElementById('player3Name').value || 'Player 3';
        const player4Name = document.getElementById('player4Name').value || 'Player 4';

        const gameMode = localStorage.getItem('gameMode');
        localStorage.setItem('player1Name', player1Name);
        localStorage.setItem('player2Name', player2Name);

        if (gameMode === 'FOUR_PLAYER') {
            localStorage.setItem('player3Name', player3Name);
            localStorage.setItem('player4Name', player4Name);
        }

        navigateTo('/pong');
    };

    window.selectGameMode = function(mode) {
        if (mode !== 'LOCAL_PVP' && mode !== 'FOUR_PLAYER') {
            localStorage.setItem('player1Name', playerInfo.nickname || 'Player 1');
            localStorage.setItem('player2Name', 'Skynet');
            localStorage.setItem('gameMode', mode);
            navigateTo('/pong');
        } else {
            showPlayerNameInputs(mode);
        }
    };

    return element;
}