document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    
    let userName = '';
    let currentState = 'greeting';
    
    // Function to add a message to the chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'message user-message' : 'message bot-message';
        
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        
        if (!isUser) {
            // Add bot avatar
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'bot-avatar';
            // avatarDiv.textContent = 'C'; // Remove text content, we are using image as background in CSS
            messageDiv.appendChild(avatarDiv);
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (typeof message === 'string') {
            // Simple text message
            const textDiv = document.createElement('div');
            textDiv.className = 'message-text';
            textDiv.textContent = message;
            contentDiv.appendChild(textDiv);
        } else if (message.type === 'text') { 
            // Handle text type message (e.g., initial greeting)
            const textDiv = document.createElement('div');
            textDiv.className = 'message-text';
            textDiv.textContent = message.message;
            contentDiv.appendChild(textDiv);
        } else if (message.type === 'options') {
            // Message with options
            const textDiv = document.createElement('div');
            textDiv.className = 'message-text';
            textDiv.textContent = message.message;
            contentDiv.appendChild(textDiv);
            
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'options-container';
            
            message.options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'option-button';
                button.textContent = option;
                button.addEventListener('click', function() {
                    handleOptionClick(option);
                });
                optionsDiv.appendChild(button);
            });
            
            contentDiv.appendChild(optionsDiv);
        } else if (message.type === 'videos') {
            // Message with video list
            const textDiv = document.createElement('div');
            textDiv.className = 'message-text';
            textDiv.textContent = message.message;
            contentDiv.appendChild(textDiv);
            
            const videosDiv = document.createElement('div');
            videosDiv.className = 'video-container';
            
            message.videos.forEach(video => {
                const videoItem = document.createElement('div');
                videoItem.className = 'video-item';
                videoItem.addEventListener('click', function() {
                    window.open(video.url, '_blank');
                });
                
                // Use placeholder for thumbnail
                const thumbnail = document.createElement('div');
                thumbnail.className = 'placeholder-thumbnail';
                thumbnail.textContent = 'Video Thumbnail';
                
                const title = document.createElement('div');
                title.className = 'video-title';
                title.textContent = video.title;
                
                videoItem.appendChild(thumbnail);
                videoItem.appendChild(title);
                videosDiv.appendChild(videoItem);
            });
            
            contentDiv.appendChild(videosDiv);
            
            // Add options after videos
            if (message.options) {
                const optionsDiv = document.createElement('div');
                optionsDiv.className = 'options-container';
                
                message.options.forEach(option => {
                    const button = document.createElement('button');
                    button.className = 'option-button';
                    button.textContent = option;
                    button.addEventListener('click', function() {
                        handleOptionClick(option);
                    });
                    optionsDiv.appendChild(button);
                });
                
                contentDiv.appendChild(optionsDiv);
            }
        } else if (message.type === 'stats') {
            // Message with stats
            const textDiv = document.createElement('div');
            textDiv.className = 'message-text';
            textDiv.textContent = message.message;
            contentDiv.appendChild(textDiv);
            
            const statsDiv = document.createElement('div');
            statsDiv.className = 'stats-container';
            
            message.stats.forEach(stat => {
                const statItem = document.createElement('div');
                statItem.className = 'stat-item';
                statItem.textContent = stat;
                statsDiv.appendChild(statItem);
            });
            
            contentDiv.appendChild(statsDiv);
            
            // Add options after stats
            if (message.options) {
                const optionsDiv = document.createElement('div');
                optionsDiv.className = 'options-container';
                
                message.options.forEach(option => {
                    const button = document.createElement('button');
                    button.className = 'option-button';
                    button.textContent = option;
                    button.addEventListener('click', function() {
                        handleOptionClick(option);
                    });
                    optionsDiv.appendChild(button);
                });
                
                contentDiv.appendChild(optionsDiv);
            }
        }
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = timeString;
        contentDiv.appendChild(timeDiv);
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to handle user input
    function handleUserInput() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        addMessage(message, true);
        userInput.value = '';
        
        // Handle different states
        if (currentState === 'greeting') {
            userName = message;
            currentState = 'name_response';
            // Store userName in localStorage for persistence
            localStorage.setItem('crickyyyUserName', userName);
            sendToServer(message, currentState);
        } else {
            sendToServer(message, currentState);
        }
    }
    
    // Function to handle option clicks
    function handleOptionClick(option) {
        addMessage(option, true);
        
        if (option === 'Trivia') {
            currentState = 'Trivia';
            sendToServer('', currentState);
        } else if (option === 'Videos') {
            currentState = 'Videos';
            sendToServer('', currentState);
        } else if (option === 'Stats') {
            currentState = 'Stats';
            sendToServer('', currentState);
        } else {
            // Handle trivia question selection
            currentState = 'trivia_answer';
            sendToServer(option, currentState);
        }
    }
    
    // Function to send data to the server
    function sendToServer(message, option) {
        fetch('/get_response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                option: option
            }),
        })
        .then(response => response.json())
        .then(data => {
            addMessage(data);
        })
        .catch(error => {
            console.error('Error:', error);
            addMessage('Sorry, something went wrong. Please try again.');
        });
    }
    
    // Event listeners
    sendButton.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
    
    // Check if we have a stored username
    const storedUserName = localStorage.getItem('crickyyyUserName');
    if (storedUserName) {
        userName = storedUserName;
        // If we have a stored username, skip to main menu
        currentState = 'name_response';
        sendToServer(userName, currentState);
    } else {
        // Initialize the chat with a greeting
        sendToServer('', 'greeting');
    }
});
