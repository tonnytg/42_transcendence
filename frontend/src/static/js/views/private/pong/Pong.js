import { main as gameMain } from '/static/js/services/game.js';

export default function Pong() {
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

                            <div class="container">
                                <div class="row border border-3">
                                    <canvas id="gameCanvas" width="800" height="600"></canvas>
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

    element.addEventListener('DOMNodeInserted', () => {
        gameMain();
    });

    return element;
}