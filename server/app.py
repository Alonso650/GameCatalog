from flask import Flask, jsonify
import random
import requests

# below imports allow to return JSON data
# and read a JSON file 

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def get_all_games():
    # Set the API endpoint and parameters
    # Doing an API call to get a list of games with a page
    # size of 1000
    api_url = "https://api.rawg.io/api/games"
    api_key = "46e2b52b8c314c51916eab168dc92f87"
    params = {
        "key": api_key,
        "page_size": 350000,
    }
    
    # Make the API request and get the response data
    response = requests.get(api_url, params=params)
    response_data = response.json()["results"]

    # Selects 10 random games from the list of 1000 games
    random_games = random.sample(response_data, 10)
    
    # Extracts the name, release date and image of each game
    # and adds it to a list
    games = []
    for game in random_games:
        game_data={
            'id': game['id'],
            'name': game['name'],
            'released': game['released'],
            'background_image': game['background_image']
        }
        games.append(game_data)
    
    return jsonify(games)
@app.route('/games/<int:id>')
def get_game_id(id):
    # Using f-string to retrieve specific game's endpoint based on the id
    api_url = f"https://api.rawg.io/api/games/{id}"
    api_key = "46e2b52b8c314c51916eab168dc92f87"
    params = {
        "key": api_key,
        "page_size": 350000,
    }
    response = requests.get(api_url, params=params)
    
    if response.status_code == 200:
        response_json = response.json()
        game_data ={
            'id': response_json['id'],
            'name': response_json['name'],
            'description': response_json['description'],
            'background_image_additional': response_json['background_image_additional'],
            'rating': response_json['rating'],
            'metacritic': response_json['metacritic']
        }
        return jsonify(game_data)
    
    

if __name__ == "__main__":
    app.run("localhost", 6969)