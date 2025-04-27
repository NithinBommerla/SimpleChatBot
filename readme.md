```markdown
# Crickyyy - Your Cricket Companion

Crickyyy is a chatbot that provides users with cricket-related information, including trivia, videos, and statistics. It serves as a companion to help users learn more about cricket in an interactive way. The bot uses Flask as the backend and offers a simple chat interface with real-time responses.

## Features
- **Cricket Trivia**: Users can choose from a variety of trivia questions and receive detailed answers.
- **Cricket Videos**: Users can watch and explore cricket-related videos from YouTube.
- **Cricket Stats**: Get random cricket statistics to learn fun facts.
- **Interactive Chat Interface**: A real-time chat interface where users can interact with the bot and get responses.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python with Flask
- **Styling**: Custom CSS, Tailwind CSS (optional)
- **API**: Flask API for handling user input and responding with trivia, video data, and stats.

## Installation

To run this project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/NithinBommerla/SimpleChatBot.git
cd SimpleChatBot
```
using SSH

```bash
git clone git@github.com:NithinBommerla/SimpleChatBot.git
cd SimpleChatBot
```

### 2. Set up a virtual environment (Optional)

For Python users, it is recommended to use a virtual environment to manage dependencies:

```bash
python3 -m venv venv
source venv/bin/activate  # For Windows use `venv\Scripts\activate`
```

### 3. Install dependencies

Once inside the virtual environment, install the required dependencies using `pip`:

```bash
pip install -r requirements.txt
```

### 4. Run the Flask app

After installing the dependencies, start the Flask app:

```bash
python app.py
```

This will run the server locally at `http://127.0.0.1:5000/`.

### 5. Open in browser

Navigate to `http://127.0.0.1:5000/` in your web browser to interact with Crickyyy!

## File Structure

```
/crickyyy
│
├── /static
│   ├── /css
│   │   └── style.css
│   ├── /images
│   │   └── avatar.png       # Avatar image used for bot avatar and favicon
│   └── /js
│       └── script.js         # JavaScript file for handling user input and chat
│
├── /templates
│   └── index.html            # HTML template for the chat interface
│
├── app.py                    # Flask backend to handle routes and user input
├── requirements.txt          # Python dependencies
└── README.md                 # Project description and instructions
```

## How It Works

- **Conversation Starter**: When the user loads the page, the bot greets them based on the time of day (Good Morning, Good Afternoon, or Good Evening).
- **User Interaction**: Users provide input, which can be a trivia question, a video selection, or just random text. The bot responds interactively.
- **Backend Logic**: The Flask app processes the user's input and sends the appropriate response (either a trivia answer, video suggestion, or cricket stat).

### Example Flow:
1. The bot greets the user with a time-based greeting.
2. The user is prompted to enter their name.
3. After the name is entered, the user can choose from the options: Trivia, Videos, or Stats.
4. The bot presents trivia questions, cricket video links, or stats for the user to interact with.

## Customization
- **Adding More Trivia**: You can extend the trivia questions in the `trivia_data` array in `app.py` by adding more dictionaries with the `question` and `answer` keys.
- **Adding More Stats**: Similarly, the `stats_data` array can be expanded with more cricket-related statistics for the bot to serve.
- **Styling**: The front-end styling can be customized in the `style.css` file to match your desired look and feel.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and make a pull request. Ensure to follow the guidelines for committing code and documenting your changes.

1. Fork the repository
2. Clone your forked repository to your local machine
3. Create a new branch for your feature or bugfix
4. Make your changes
5. Test your changes
6. Submit a pull request to the main repository

```
