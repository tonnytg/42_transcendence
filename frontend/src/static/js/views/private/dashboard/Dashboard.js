export default function Dashboard() {
    const element = document.createElement('div');
    element.innerHTML = `
                            <!-- Navigation bar | Web component -->
                            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                                <div class="container-fluid">
                                    <a class="navbar-brand text-white" href="#">Pong</a>
                                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                        <span class="navbar-toggler-icon"></span>
                                    </button>
                                    <div class="collapse navbar-collapse" id="navbarNav">
                                        <ul class="navbar-nav ms-auto">
                                            <li class="nav-item">
                                                <a class="nav-link text-white" href="/dashboard">Página inicial</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link text-white" href="/pong">Game</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>

                            <!-- Container to put elements on page -->
                            <div class="container mt-3">
                                <!-- Row to put elements side by side -->
                                <div class="row justify-content-between">
                                    <!-- column to put elements on page -->
                                    <div class="col-12 col-md-6">
                                        <!-- Block of content to put elements on page -->
                                        <div class="border border-3 boder-black m-1 p-4">
                                            <h2>Modos de jogar</h2>
                                            <p>
                                                Está pronto para se divertir? No modo Han Solo, você encara a clássica batalha de Pong sozinho, onde a rapidez e a precisão são suas melhores aliadas.
                                                Ou, se prefere um desafio mais intenso, enfrente a Skynet e teste suas habilidades contra a IA. Prove que os humanos ainda são superiores e que as máquinas não podem nos dominar... ainda!
                                            </p>
                                            <div class="d-grid ">
                                                <button type="button" class="btn btn-primary btn-block">Han Solo</button>
                                                <p class="text-center fs-5">ou</p>
                                                <button type="button" class="btn btn-primary btn-block" onclick="window.location.href='/pong'">Contra a Skynet</button>
                                            </div>
                                        </div>
                                        <!-- Block of content to put elements on page -->
                                        <div class="border border-3 boder-black m-1 p-4">
                                            <h2>Torneio online</h2>
                                            <p>
                                                Desafie seus amigos em um torneio online e mostre quem é o melhor.
                                                Mostre suas habilidades e seja o primeiro do ranking.
                                            </p>
                                            <!-- Button Block -->
                                            <div class="d-grid">
                                                <button type="button" class="btn btn-primary btn-block d-grid">Torneio online</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <div class="border border-3 boder-black m-1 p-4 justify-content-between align-items-center">
                                            <h2>Score Points</h2>
                                            <!-- Table to ranking on page -->
                                            <table class="table justify-content-between">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Posição</th>
                                                    <th scope="col">Jogador</th>
                                                    <th scope="col">Pontos</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Ygor</td>
                                                        <td>7398</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Jacob</td>
                                                        <td>6790</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>John</td>
                                                        <td>6215</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">4</th>
                                                        <td>Sarah</td>
                                                        <td>5890</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">5</th>
                                                        <td>Emily</td>
                                                        <td>5423</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">6</th>
                                                        <td>Michael</td>
                                                        <td>5120</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">7</th>
                                                        <td>David</td>
                                                        <td>4789</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">8</th>
                                                        <td>Emma</td>
                                                        <td>4512</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">9</th>
                                                        <td>Ava</td>
                                                        <td>4290</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">10</th>
                                                        <td>Noah</td>
                                                        <td>4023</td>
                                                    </tr>
                                                </tbody>
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
    return element;
}
