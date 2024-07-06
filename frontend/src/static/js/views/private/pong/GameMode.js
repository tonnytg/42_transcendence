import { navigateTo } from '/static/js/Router.js';

export default function GameMode() {
    const playerInfo = JSON.parse(localStorage.getItem('playerInfo')) || { nickname: 'Player 1' };

    const element = document.createElement('div');
    element.innerHTML = `
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
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary mx-2" onclick="selectGameMode('TRAINING')">Han Solo</button>
                        <button class="btn btn-primary mx-2" onclick="selectGameMode('SOLO_PLAYER')">Versus Skynet</button>
                        <button class="btn btn-primary mx-2" onclick="selectGameMode('LOCAL_PVP')">Human vs Human</button>
                        <button class="btn btn-primary mx-2" onclick="selectGameMode('FOUR_PLAYER')">Apocalypse</button>
                    </div>
                    <div id="difficultySelection" class="mt-3" style="display: none;">
                        <h3 class="text-center">Escolha a Dificuldade</h3>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-dark mx-2" onclick="setDifficulty('easy')">
                                <i class="fas fa-baby"></i> Baby
                            </button>
                            <button class="btn btn-dark mx-2" onclick="setDifficulty('medium')">
                                <i class="fas fa-smile"></i> Be happy
                            </button>
                            <button class="btn btn-dark mx-2" onclick="setDifficulty('hard')">
                                <i class="fas fa-skull-crossbones"></i> Death
                            </button>
                            <button class="btn btn-dark mx-2" onclick="setDifficulty('legend')">
                                <i class="fas fa-ghost"></i> Legend
                            </button>
                    </div>
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

    window.selectGameMode = function(mode) {
        localStorage.setItem('gameMode', mode);
        if (mode === 'SOLO_PLAYER') {
            document.getElementById('difficultySelection').style.display = 'block';
        } else {
            navigateTo('/pong');
        }
    };

    window.setDifficulty = function(difficulty) {
        localStorage.setItem('aiDifficulty', difficulty);
        navigateTo('/pong');
    };

    return element;
}
