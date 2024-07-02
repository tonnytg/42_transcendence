import { sendChatMessage } from '/static/js/services/events/client.js';

export default function Chat() {
    const element = document.createElement('div');

    element.innerHTML = `
        <div class="container mt-3">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <div class="card">
                        <div class="card-header">Chat</div>
                        <div class="card-body">
                            <div id="chatMessages" class="mb-3" style="height: 300px; overflow-y: scroll;">
                                <!-- Chat messages will be appended here -->
                            </div>
                            <div class="input-group">
                                <input type="text" id="chatInput" class="form-control" placeholder="Type a message">
                                <button class="btn btn-primary" id="sendButton">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const chatMessages = element.querySelector('#chatMessages');
    const chatInput = element.querySelector('#chatInput');
    const sendButton = element.querySelector('#sendButton');

    // Function to append message to chat
    function appendMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Event listener for send button
    sendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            sendChatMessage(message);
            appendMessage(`You: ${message}`);
            chatInput.value = '';
        }
    });

    // Function to handle incoming messages
    window.displayChatMessage = (message) => {
        appendMessage(message);
    };

    return element;
}
