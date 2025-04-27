
from flask import Flask, render_template, request, jsonify
import random
from datetime import datetime

app = Flask(__name__)

# Cricket trivia questions and answers
trivia_data = [
    {"question": "Who has scored the most runs in international cricket?", "answer": "Sachin Tendulkar holds the record with over 34,000 runs across all formats."},
    {"question": "Which team won the first Cricket World Cup?", "answer": "West Indies won the first Cricket World Cup in 1975."},
    {"question": "Who has taken the most wickets in Test cricket?", "answer": "Muttiah Muralitharan holds the record with 800 Test wickets."},
    {"question": "What is the highest team total in a One Day International?", "answer": "England's 498/4 against the Netherlands in 2022."},
    {"question": "Who hit six sixes in an over in the T20 World Cup?", "answer": "Yuvraj Singh hit six sixes in an over against England in the 2007 T20 World Cup."},
    {"question": "Which batsman has the highest individual score in Test cricket?", "answer": "Brian Lara holds the record with 400 not out against England in 2004."},
    {"question": "Which country has won the most Cricket World Cups?", "answer": "Australia has won the most Cricket World Cups with 5 titles."},
    {"question": "Who is known as 'The Little Master' in cricket?", "answer": "Sachin Tendulkar is known as 'The Little Master'."},
    {"question": "What is the name of the trophy awarded in the India-Australia Test series?", "answer": "The Border-Gavaskar Trophy is awarded in the India-Australia Test series."},
    {"question": "Which bowler has taken the most wickets in a single Test match?", "answer": "Jim Laker holds the record with 19 wickets in a single Test match."}
]

# Cricket videos data
videos_data = [
    {"title": "Top 10 Cricket Moments", "url": "https://www.youtube.com/watch?v=0vNQBlrSQZw", "thumbnail": "/static/images/thumbnail1.jpg"},
    {"title": "Best Cricket Catches", "url": "https://www.youtube.com/watch?v=WX9fRb9M_bY", "thumbnail": "/static/images/thumbnail2.jpg"},
    {"title": "Greatest Cricket Rivalries", "url": "https://www.youtube.com/watch?v=BwA8db6R3G0", "thumbnail": "/static/images/thumbnail3.jpg"},
    {"title": "Cricket World Cup 2024 Highlights", "url": "https://www.youtube.com/watch?v=3yiWqnKl7lQ", "thumbnail": "/static/images/thumbnail4.jpg"},
    {"title": "Legendary Cricket Partnerships", "url": "https://www.youtube.com/watch?v=FqxK_eS0p4Y", "thumbnail": "/static/images/thumbnail5.jpg"}
]

# Cricket stats data
stats_data = [
    "The fastest ODI century was scored by AB de Villiers in just 31 balls.",
    "The highest individual score in ODI cricket is 264 by Rohit Sharma.",
    "The longest Test match lasted for 9 days but still ended in a draw.",
    "Sachin Tendulkar scored 100 international centuries in his career.",
    "The highest team score in Test cricket is 952/6 by Sri Lanka against India.",
    "Don Bradman's Test batting average of 99.94 is considered the greatest statistical achievement in any sport.",
    "The first official international cricket match was played in 1877 between Australia and England.",
    "MS Dhoni is the only captain to win all three major ICC trophies: T20 World Cup, ODI World Cup, and Champions Trophy.",
    "The fastest delivery in cricket was bowled by Shoaib Akhtar at 161.3 km/h.",
    "Virat Kohli has scored the most centuries in successful run chases in ODIs.",
    "Chris Gayle holds the record for the most sixes in international cricket.",
    "The longest six in cricket history was hit by Shahid Afridi, measured at 158 meters."
]

def get_greeting():
    current_hour = datetime.now().hour
    if 5 <= current_hour < 12:
        return "Good Morning"
    elif 12 <= current_hour < 17:
        return "Good Afternoon"
    else:
        return "Good Evening"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    user_message = request.json.get('message', '')
    user_option = request.json.get('option', '')
    
    # If the conversation just started, send a greeting without needing a user option
    if user_option == '' or user_option == 'greeting':
        greeting = get_greeting()
        return jsonify({
            'message': f'Hello {greeting}! I am Crickyyy, your cricket assistant. May I know your name?',
            'type': 'text'
        })
    
    # Handle user response after name is provided
    if user_option == 'name_response':
        return jsonify({
            'message': f'Hello {user_message}!! Nice to meet you, I can help you with cricket information. What would you like to explore?',
            'type': 'options',
            'options': ['Trivia', 'Videos', 'Stats']
        })
    
    # Handle trivia selection
    elif user_option == 'Trivia':
        questions = [item["question"] for item in trivia_data]
        return jsonify({
            'message': 'Choose a cricket trivia question:',
            'type': 'options',
            'options': questions
        })
    
    # Handle trivia answer
    elif user_option == 'trivia_answer':
        for item in trivia_data:
            if item["question"] == user_message:
                return jsonify({
                    'message': item["answer"],
                    'type': 'options',
                    'options': ['Trivia', 'Videos', 'Stats']
                })
    
    # Handle video selection
    elif user_option == 'Videos':
        video_list = []
        for video in videos_data:
            video_list.append({
                'title': video['title'],
                'url': video['url'],
                'thumbnail': video['thumbnail']
            })
        return jsonify({
            'message': 'Check out these cricket videos:',
            'type': 'videos',
            'videos': video_list,
            'options': ['Trivia', 'Videos', 'Stats']
        })
    
    # Handle stats selection
    elif user_option == 'Stats':
        selected_stats = random.sample(stats_data, min(5, len(stats_data)))
        return jsonify({
            'message': 'Did you know?',
            'type': 'stats',
            'stats': selected_stats,
            'options': ['Trivia', 'Videos', 'Stats']
        })
    
    else:
        return jsonify({
            'message': "I'm not sure what you're asking. Would you like to explore something else?",
            'type': 'options',
            'options': ['Trivia', 'Videos', 'Stats']
        })

if __name__ == '__main__':
    app.run(debug=True)
