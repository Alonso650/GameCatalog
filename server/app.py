from flask import Flask, jsonify
import random
import requests
import threading
import time

# below imports allow to return JSON data
# and read a JSON file 

from flask_cors import CORS

app = Flask(__name__)
CORS(app)
game_cache = []
game_cache_lock = threading.Lock()


# @app.route('/')
# def get_all_games():
#     # Set the API endpoint and parameters
#     # Doing an API call to get a list of games with a page
#     # size of 350000
#     api_url = "https://api.rawg.io/api/games"
#     api_key = "46e2b52b8c314c51916eab168dc92f87"
#     params = {
#         "key": api_key,
#         "page_size": 10000,
#     }
    
#     # Make the API request and get the response data
#     response = requests.get(api_url, params=params)
#     response_data = response.json()["results"]

#     # Selects 10 random games from the list of 1000 games
#     #random_games = random.sample(response_data, 1000)

#     random.shuffle(response_data)

#     num_random_games = 100
#     random_games = response_data[:num_random_games]
    
#     # Extracts the name, release date and image of each game
#     # and adds it to a list
#     games = []
#     for game in random_games:
#         game_data={
#             'id': game['id'],
#             'name': game['name'],
#             'released': game['released'],
#             'background_image': game['background_image']
#         }
#         games.append(game_data)

#     print(games)
    
#     return jsonify(games)

def refresh_game_cache():
    global game_cache
    # Set the API endpoint and parameters
    # Doing an API call to get a list of games with a page
    # size of 350000
    api_url = "https://api.rawg.io/api/games"
    api_key = "46e2b52b8c314c51916eab168dc92f87"
    params = {
        "key": api_key,
        "page_size": 1000,
    }

    # Make the api request to get the response data
    response = requests.get(api_url, params=params)
    response_data = response.json().get("results", [])
    
    # Shuffle list of games to random
    random.shuffle(response_data)

    # Lock the cache while updating it
    # Ensures the list is updated with new game data fetched from the api
    # and it is done in a thread-safe manner
    with game_cache_lock:
        game_cache = response_data

def select_random_games(num_games):
    with game_cache_lock:
        if len(game_cache) < num_games:
            # Refresh the cache if it's nearly exhausted
            refresh_game_cache()
        random_games = random.sample(game_cache, num_games)
        # Remove the selected games from the cache
        game_cache[:] = [game for game in game_cache if game not in random_games]
    return random_games

def cache_refresh_thread():
    while True:
        refresh_game_cache()
        time.sleep(3600)

cache_refresh = threading.Thread(target=cache_refresh_thread)
cache_refresh.daemon = True
cache_refresh.start()

@app.route('/')
def get_random_games():
    num_random_games = 6
    random_games = select_random_games(num_random_games)

    games = []
    for game in random_games:
        game_data = {
            'id': game['id'],
            'name': game['name'],
            'released': game['released'],
            'background_image': game['background_image']
        }
        games.append(game_data)
    return jsonify(games)

@app.route('/game/<int:id>')
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
            'metacritic': response_json['metacritic']
        }
        return jsonify(game_data)
    
    return jsonify({"error": "Game not found"}), 404
    
    

if __name__ == "__main__":
    app.run("localhost", 6969)