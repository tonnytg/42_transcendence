$(document).ready(function() {
    // Função de inicialização do gráfico
    function initializeChart() {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
                datasets: [{
                    label: 'Vendas',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Inicialize o gráfico
    initializeChart();

    // Função para validar login
    $("#loginForm").submit(function(event) {
        event.preventDefault(); // Evita o envio do formulário padrão
        // Obtenha os valores do formulário
        var username = $("#username").val();
        var password = $("#password").val();
        // Faça a validação do login (substitua isso com sua lógica real de validação)
        if (username === "admin" && password === "admin") {
            $("#loginForm").hide();
            $("#dashboard").show();
        } else {
            alert("Usuário ou senha inválidos.");
        }
    });

    // Função para iniciar o jogo de pong ao clicar no botão
    $("#startPong").click(function() {
        $("#dashboard").hide();
        $("#pong_game").show();
        startPongGame();
    });

    $("#backToDashboardFromPong").click(function() {
        $("#pong_game").hide();
        $("#dashboard").show();
    });

    // Função para abrir o chat
    $("#openChat").click(function() {
        $("#dashboard").hide();
        $("#chat").show();
    });

    // Função para sair do chat
    $("#leaveChat").click(function(event) {
        event.preventDefault();
        $("#chat").hide();
        $("#dashboard").show();
    });

    // Função para abrir o placar
    $("#viewScoreboard").click(function() {
        $("#dashboard").hide();
        $("#scoreboard").show();
    });

    // Função para sair do placar
    $("#leaveScoreboard").click(function() {
        $("#scoreboard").hide();
        $("#dashboard").show();
    });

    // Função para enviar mensagens no chat
    $("#chatForm").submit(function(event) {
        event.preventDefault();
        var message = $("#message").val();
        if (message) {
            $("#chatMessages").append("<p>" + message + "</p>");
            $("#message").val('');
        }
    });

    // Função para iniciar o jogo de pong
    function startPongGame() {
        var canvas = document.getElementById("pongCanvas");
        var ctx = canvas.getContext("2d");

        // Variáveis do jogo
        var ballRadius = 10;
        var x = canvas.width / 2;
        var y = canvas.height - 30;
        var dx = 2;
        var dy = -2;
        var paddleHeight = 10;
        var paddleWidth = 75;
        var paddleX = (canvas.width - paddleWidth) / 2;
        var rightPressed = false;
        var leftPressed = false;
        var playerScore = 0;
        var computerScore = 0;

        // Funções para desenhar a bola, a raquete e detectar as teclas pressionadas
        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function keyDownHandler(e) {
            if (e.key == "Right" || e.key == "ArrowRight") {
                rightPressed = true;
            } else if (e.key == "Left" || e.key == "ArrowLeft") {
                leftPressed = true;
            }
        }

        function keyUpHandler(e) {
            if (e.key == "Right" || e.key == "ArrowRight") {
                rightPressed = false;
            } else if (e.key == "Left" || e.key == "ArrowLeft") {
                leftPressed = false;
            }
        }

        // Função para atualizar a posição da bola e da raquete
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBall();
            drawPaddle();

            // Verifique as bordas do canvas para a bola
            if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                dx = -dx;
            }
            if (y + dy < ballRadius) {
                dy = -dy;
            } else if (y + dy > canvas.height - ballRadius) {
                if (x > paddleX && x < paddleX + paddleWidth) {
                    dy = -dy;
                    playerScore++;
                    $("#playerScore").text("Jogador: " + playerScore);
                } else {
                    computerScore++;
                    $("#computerScore").text("Computador: " + computerScore);
                    if (computerScore >= 10) {
                        alert("Game Over");
                        document.location.reload();
                    } else {
                        x = canvas.width / 2;
                        y = canvas.height - 30;
                        dx = 2;
                        dy = -2;
                        paddleX = (canvas.width - paddleWidth) / 2;
                    }
                }
            }

            // Mova a raquete esquerda/direita
            if (rightPressed && paddleX < canvas.width - paddleWidth) {
                paddleX += 7;
            } else if (leftPressed && paddleX > 0) {
                paddleX -= 7;
            }

            x += dx;
            y += dy;
        }

        // Event listeners para as teclas pressionadas
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);

        // Função de loop do jogo
        setInterval(draw, 10);
    }
});
