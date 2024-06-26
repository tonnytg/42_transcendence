const homeTemplate = document.createElement('template');
homeTemplate.innerHTML = `
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .container {
            display: flex;
            height: 100vh;
        }
        .chat-container {
            width: 25%;
            border-right: 1px solid #ddd;
            padding: 10px;
        }
        .game-container {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f8f9fa;
        }
        canvas {
            border: 1px solid #000;
            background-color: #fff;
        }
    </style>
    <div class="container">
        <div class="chat-container">
            <h5>Chat</h5>
            <!-- Chat content goes here -->
        </div>
        <div class="game-container">
            <canvas id="gameCanvas" width="800" height="600"></canvas>
        </div>
    </div>
`;

class Home extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(homeTemplate.content.cloneNode(true));
    }
}

customElements.define('app-home', Home);
