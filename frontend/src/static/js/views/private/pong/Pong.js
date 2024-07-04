import { main as gameMain } from '/static/js/services/game.js';

export default function Pong() {
    const element = document.createElement('div');
    element.innerHTML = `
                            <!-- Navigation bar | Web component -->
                            <navigation-bar></navigation-bar>

                            <div class="container mt-3">
                                <div class="row border border-3 boder-black p-2">
                                    <div class="col-12 col-md-8">
                                                <h1 class="text-center">Choose Game Mode</h1>
                                                <div class="d-flex justify-content-center">
                                                    <button class="btn btn-primary mx-2" onclick="startGame('TRAINING')">Hans Solo</button>
                                                    <button class="btn btn-primary mx-2" onclick="startGame('SOLO_PLAYER')">You Vs Skynet</button>
                                                    <button class="btn btn-primary mx-2" onclick="startGame('LOCAL_PVP')">Local PvP</button>
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