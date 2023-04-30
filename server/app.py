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
        "page_size": 1000,
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

    

# '/users' is an endpoint with method
# @app.route('/users', methods=["GET", "POST"])
# def users():
#     print("users endpoint reached..")
#     if requests.method == "GET":
#         # r = reading
#         with open("users.json", "r") as f:
#             data = json.load(f)
#             data.append({
#                 "username": "user4",
#                 "pets": ["hamster"]
#             })

#             # with a newly added user data set
#             # have to send it as a valid response
#             # we have to convert data agin using flask.jsonify()
#             return flask.jsonify(data)
#     if request.method == "POST":
#         received_data = request.get_json()
#         print(f"received data: {received_data}")
#         message = received_data['data']
#         return_data = {
#             "status": "success",
#             "message": f"recieved: {message}"
#         }
#         return flask.Response(response=json.dumps(return_data), status=201)

if __name__ == "__main__":
    app.run("localhost", 6969)