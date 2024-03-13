document.getElementById('send-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
        addToChatBox('You', userInput);
        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: userInput }),
        })
        .then(response => response.json())
        .then(data => {
            const chatbotResponse = data.choices[0].text.trim();
            addToChatBox('Chatbot', chatbotResponse);
            document.getElementById('user-input').value = ''; // Clear input field after sending
        })
        .catch((error) => {
            console.error('Error:', error);
            addToChatBox('AI', 'Sorry, there was an error processing your request.');
        });
    }
});

function addToChatBox(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}
