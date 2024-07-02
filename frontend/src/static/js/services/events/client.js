let socket;
let isConnected = false;

function connectWebSocket() {
    socket = new WebSocket('ws://localhost:8000/ws/game/');

    socket.onopen = function(e) {
        isConnected = true;
        console.log('Connection established');
    };

    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        const messageType = data.type;

        if (messageType === 'notification') {
            displayNotification(data.notification);
        } else if (messageType === 'chat_message') {
            displayChatMessage(data.message);
        }
    };

    socket.onclose = function(event) {
        isConnected = false;
        console.log('Connection closed');
        // Attempt to reconnect after a delay
        setTimeout(connectWebSocket, 5000);
    };

    socket.onerror = function(error) {
        console.error(`WebSocket error: ${error.message}`);
    };
}

function sendChatMessage(message) {
    if (isConnected) {
        socket.send(JSON.stringify({
            'type': 'chat_message',
            'message': message
        }));
    } else {
        console.error('WebSocket is not connected');
    }
}

function displayNotification(message) {
    alert(message); // Você pode usar outra forma de exibição, como um modal ou um toast
}

function displayChatMessage(message) {
    if (typeof window.displayChatMessage === 'function') {
        window.displayChatMessage(message);
    } else {
        console.log('Chat:', message); // Fallback para exibir no console
    }
}

// Para enviar uma notificação
function sendNotification(notification) {
    if (isConnected) {
        socket.send(JSON.stringify({
            'type': 'notification',
            'notification': notification
        }));
    } else {
        console.error('WebSocket is not connected');
    }
}

// Inicializar a conexão WebSocket
connectWebSocket();

export { sendChatMessage, sendNotification };
