var sendBtn = document.getElementById('sendBtn');
var textbox = document.getElementById('textbox');
var chatContainer = document.getElementById('chatContainer');

var user = { message: '' };

// Function to display user's message
function sendMessage(userMessage) {
  var messageElement = document.createElement('div');
  messageElement.style.textAlign = 'right';
  messageElement.style.margin = '10px';

  messageElement.innerHTML = '<span>You: </span>' + '<span>' + userMessage + '</span>';
  chatContainer.appendChild(messageElement);
}

// Function to display chatbot's response
function chatbotResponse(botMessage) {
  var messageElement = document.createElement('div');
  messageElement.innerHTML = '<span>Chatbot: </span>' + '<span>' + botMessage + '</span>';
  chatContainer.appendChild(messageElement);
}

// Function to fetch data from backend
function getData(userMessage) {
  const url = 'http://localhost:3002/processInput';  // Ensure this matches your backend URL
  const postData = {
    userInput: userMessage,  // Match the parameter name with backend
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .then((data) => {
      chatbotResponse(data.output);  // Display the chatbot's response
      console.log('Response from server:', data);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

// Event listener for Send button
sendBtn.addEventListener('click', function (e) {
  var userMessage = textbox.value;

  if (userMessage == '') {
    alert('Please type in a message');
  } else {
    let userMessageText = userMessage.trim();
    user.message = userMessageText;
    textbox.value = '';  // Clear the input after sending

    sendMessage(userMessageText);  // Display user's message
    getData(userMessageText);      // Send message to backend
  }
});
