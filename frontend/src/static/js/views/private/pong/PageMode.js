<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Page</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Silkscreen', cursive;
        }
        #gameCanvas {
            background-color: black;
        }
    </style>
</head>
<body>
    <div class="container my-5">
        <h1 class="text-center">Choose Game Mode</h1>
        <div class="d-flex justify-content-center">
            <button class="btn btn-primary mx-2" onclick="startGame('TRAINING')">Training Mode</button>
            <button class="btn btn-primary mx-2" onclick="startGame('SOLO_PLAYER')">Solo Player</button>
            <button class="btn btn-primary mx-2" onclick="startGame('LOCAL_PVP')">Local PvP</button>
            <button class="btn btn-primary mx-2" onclick="startGame('LOCAL_PVP')">MultiPlayer</button>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fontfaceobserver/2.1.0/fontfaceobserver.standalone.js"></script>
	<script src="js/game.js"></script> <!-- Certifique-se de que o caminho está correto -->
    <script>
        function startGame(mode) {
            window.location.href = 'game.html?mode=' + mode;
        }
    </script>
</body>
</html>
