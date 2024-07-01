export default function LiveChat() {
    const element = document.createElement('div');
    element.innerHTML = `
        <div id="chat-log-container">
            <textarea id="chat-log" cols="100" rows="20" readonly></textarea>
        </div>
        <div id="chat-input-container">
            <input id="chat-message-input" type="text" size="100">
            <input id="chat-message-submit" type="button" value="Send">
        </div>
    `;

    // Certifique-se de que os elementos estão presentes no DOM antes de continuar
    setTimeout(() => {
        // Configurar WebSocket
        const chatSocket = new WebSocket('ws://' + window.location.host + ":8000" + '/ws/chat/');

        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            document.querySelector('#chat-log').value += (data.message + '\n');
        };

        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

        document.querySelector('#chat-message-input').focus();
        document.querySelector('#chat-message-input').onkeyup = function(e) {
            if (e.keyCode === 13) {  // Enter key
                document.querySelector('#chat-message-submit').click();
            }
        };

        document.querySelector('#chat-message-submit').onclick = function(e) {
            const messageInputDom = document.querySelector('#chat-message-input');
            const message = messageInputDom.value;
            chatSocket.send(JSON.stringify({
                'message': message
            }));
            messageInputDom.value = '';
        };
    }, 100); // Dê um pequeno atraso para garantir que o DOM esteja pronto

    return element;
}
