from flask import Flask, jsonify
import random
import requests
# urllib.request is a python module that will be used
# tos end the request to the desired api
import urllib.request, json

# below imports allow to return JSON data
# and read a JSON file 

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


#API = config('API_KEY')
@app.route('/')
def get_popular_games():
    # Set the API endpoint and parameters
    api_url = "https://api.rawg.io/api/games"
    api_key = "46e2b52b8c314c51916eab168dc92f87"
    params = {
        "key": api_key,
        # "ordering": "-added",
        "page_size": 10,
    }
    
    # Make the API request and get the response data
    response = requests.get(api_url, params=params)
    response_data = response.json()
    
    # Extract the game names from the response data and return as JSON
    games = []
    for game in response_data['results']:
        #game["background_image_url"] = game["background_image"]
        # games.append(game['name'])
        #games.append(game['background_image'])
        #games.append(game['id'])
        #games[game['name']] = game['background_image']
        game_data={
            'id': game['id'],
            'name': game['name'],
            'released': game['released'],
            'background_image': game['background_image']
        }
        games.append(game_data)

    # json_object = json.loads(games)
    # json_formatted = json.dumps(json_object, indent = 2)
    # print(json_formatted)
    
    return jsonify(games)



# @app.route("/")
# def get_games():
#     api_url = "https://www.giantbomb.com/api/games/"
#     api_key = "8dd109cfd885e3367a3cde2b474e0c9a924e9534"
#     params = {
#         "api_key": api_key,
#         "format": "json",
#         "field_list": "name",
#     }
#     response = requests.get(api_url, params=params)
#     jsondata = response.json()

#     # game_json = []
#     # for game in jsondata["results"]:
#     #     game_json.append({"name": game["name"]})

#     # random.shuffle(game_json)
#     # return {"games": game_json}
#     game_names = [game['name'] for game in jsondata['results']]
#     random.shuffle(game_names)
#     return jsonify(game_names)
    



    
# @app.route("/randomGames")
# def generate_game_list():


   

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