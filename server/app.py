from flask import Flask, jsonify
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
@app.route("/")
def get_games():
    api_url = "https://www.giantbomb.com/api/games/?api_key=8dd109cfd885e3367a3cde2b474e0c9a924e9534&format=json&filed_list=name"

    response = urllib.request.urlopen(api_url)
    data = response.read()
    jsondata = json.loads(data)
    return jsondata

@app.route("/games")
def get_games_list():
    api_url = "https://www.giantbomb.com/api/games/"
    api_key = "8dd109cfd885e3367a3cde2b474e0c9a924e9534"
    params = {
        "api_key": api_key,
        "format": "json",
        "field_list": "name",
        "number_of_page_results": "200"
     #   "limit": 10
    }

    response = requests.get(api_url, params=params)

    jsondata = response.json()

    game_json = []
    for game in jsondata["results"]:
        game_json.append({"name": game["name"]})
    
    return {"games": game_json}
# @app.route("/api/games")
# def get_games():
#     # api_url = "https://www.giantbomb.com/api/games/?api_key=8dd109cfd885e3367a3cde2b474e0c9a924e9534&format=json&filed_list=name"
#     url = "https://www.giantbomb.com/api/games/"
#     params ={'api_key': '8dd109cfd885e3367a3cde2b474e0c9a924e9534', 'format': 'json'}

#     # response = urllib.request.urlopen(api_url)
#     response = requests.get(url, params=params)
#     games = response.json()['results']
#     # data = response.read()
#     # jsondata = json.loads(data)
#     # return jsondata
#     return jsonify(games)

# @app.route("/games")
# def get_games_list():
   
    
    # api_url = "https://www.giantbomb.com/api/games/?api_key=8dd109cfd885e3367a3cde2b474e0c9a924e9534&format=json&field_list=name"
    # response = urllib.request.urlopen(api_url)
    # data = response.read()
    # jsondata = json.loads(data)

    # game_json = []

    # for game in jsondata["results"]:
    #     game = {
    #         "name": game["name"],
    #     }

    #     game_json.append(game)
    # print(game_json)
    # return game_json


    
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