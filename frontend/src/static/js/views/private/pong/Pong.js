export default function Pong() {
    const element = document.createElement('div');
    element.innerHTML = `
                            <!-- Navigation bar | Web component -->
                            <navigation-bar></navigation-bar>
							
    <div class="container mt-3">
        <div class="row border border-3 boder-black p-2">
            <div class="col-12 col-md-8">
				<div class="">
                    <canvas id="gameCanvas" class="w-100 h-100" width="500" height="400"></canvas>
                    <div id="touchControls" class="d-flex justify-content-between mt-3">
                        <button id="upButton" class="btn btn-outline-dark">
                            <i class="fas fa-arrow-up"></i>
                        </button>
                        <button id="downButton" class="btn btn-outline-dark">
                            <i class="fas fa-arrow-down"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="border border-3 boder-black m-1 p-4">
					<h2>Chat</h2>
					<!-- Conversation Messages Simulation-->
					<div>
						<div class="conversation" id="conversation">
							<div class="messages">
								<h4>Alguém disse:</h4>
								<div class="bg-ligh friend__messages">
									<div class="friend__message">Olá, tudo bem?</div>
									<div class="friend__message">Estou bem, e você?</div>
									<div class="friend__message">Também estou bem, obrigado por perguntar.</div>
								</div>
								<div class="you">
									<h4>Você:</h4>
									<div class="you__messages align-items-right">
										<div class="you__message">Olá, tudo bem?</div>
										<div class="you__message">Estou bem, e você?</div>
										<div class="you__message">Também estou bem, obrigado por perguntar.</div>
								</div>
							</div>
						</div>
					</div>
					<div class="chat" id="chat">
						<div class="chat__messages" id="chatMessages"></div>
						<form id="chatForm">
							<input type="text" class="form-control" id="chatInput" placeholder="Digite sua mensagem">
							<button type="submit" class="btn btn-primary w-100 mt-2">Enviar</button>
						</form>
					</div>
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
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
                <button type="button" class="btn btn-success" data-bs-dismiss="modal" id="restartGameButton">Restart</button>
            </div>
        </div>
    </div>
</div>

	`;
    return element;
}
