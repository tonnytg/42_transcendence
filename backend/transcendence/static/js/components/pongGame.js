// static/js/components/pongGame.js
class PongGame extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                canvas {
                    width: 100%;
                    height: auto;
                    border: 4px solid #fff;
                }
            </style>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-10 col-lg-8">
                        <canvas id="gameCanvas" width="800" height="600"></canvas>
                    </div>
                </div>
            </div>
            <script>
                const canvas = this.shadowRoot.getElementById('gameCanvas');
                const context = canvas.getContext('2d');

                const paddleHeight = 100;
                const paddleWidth = 10;
                const ballSize = 10;

                let ballX = canvas.width / 2;
                let ballY = canvas.height / 2;
                let ballSpeedX = 5;
                let ballSpeedY = 5;

                let paddle1Y = (canvas.height - paddleHeight) / 2;
                let paddle2Y = (canvas.height - paddleHeight) / 2;
                const paddleSpeed = 8;

                function drawBall() {
                    context.fillStyle = 'white';
                    context.beginPath();
                    context.arc(ballX, ballY, ballSize, 0, Math.PI * 2, true);
                    context.fill();
                }

                function drawPaddle(x, y) {
                    context.fillStyle = 'white';
                    context.fillRect(x, y, paddleWidth, paddleHeight);
                }

                function drawNet() {
                    context.fillStyle = 'white';
                    context.fillRect(canvas.width / 2 - 1, 0, 2, canvas.height);
                }

                function moveBall() {
                    ballX += ballSpeedX;
                    ballY += ballSpeedY;

                    if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
                        ballSpeedY = -ballSpeedY;
                    }

                    if (ballX - ballSize < paddleWidth) {
                        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
                            ballSpeedX = -ballSpeedX;
                        } else {
                            resetBall();
                        }
                    }

                    if (ballX + ballSize > canvas.width - paddleWidth) {
                        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
                            ballSpeedX = -ballSpeedX;
                        } else {
                            resetBall();
                        }
                    }
                }

                function resetBall() {
                    ballX = canvas.width / 2;
                    ballY = canvas.height / 2;
                    ballSpeedX = -ballSpeedX;
                    ballSpeedY = 3;
                }

                function movePaddle(event) {
                    switch (event.key) {
                        case 'ArrowUp':
                            paddle2Y = Math.max(0, paddle2Y - paddleSpeed);
                            break;
                        case 'ArrowDown':
                            paddle2Y = Math.min(canvas.height - paddleHeight, paddle2Y + paddleSpeed);
                            break;
                        case 'w':
                            paddle1Y = Math.max(0, paddle1Y - paddleSpeed);
                            break;
                        case 's':
                            paddle1Y = Math.min(canvas.height - paddleHeight, paddle1Y + paddleSpeed);
                            break;
                    }
                }

                function gameLoop() {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    drawNet();
                    drawBall();
                    drawPaddle(0, paddle1Y);
                    drawPaddle(canvas.width - paddleWidth, paddle2Y);
                    moveBall();
                    requestAnimationFrame(gameLoop);
                }

                document.addEventListener('keydown', movePaddle);
                gameLoop();
            </script>
        `;
    }
}

customElements.define('pong-game', PongGame);
