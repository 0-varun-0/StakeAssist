// Chat System - Simple Example

const sendButton = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages-container');

// Function to add a new message
function addMessage(content, isUserMessage = true) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message-bubble', isUserMessage ? 'user' : 'system');
    messageDiv.textContent = content;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to bottom
}

// Add sample system messages on page load
window.onload = () => {
    addMessage('Welcome to the group chat!', false);
    addMessage('Stakeholders are now connected. Let\'s start collaborating!', false);
};

// Event listener for the send button
sendButton.addEventListener('click', () => {
    const messageContent = messageInput.value.trim();
    if (messageContent !== '') {
        addMessage(messageContent); // Add user message
        messageInput.value = ''; // Clear input field
        alert("Successfully submitted!");
    }
});
