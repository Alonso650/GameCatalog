from flask import Flask, request
# urllib.request is a python module that will be used
# tos end the request to the desired api
import urllib.request, json

# below imports allow to return JSON data
# and read a JSON file 
import flask
import json
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
    api_url = "https://www.giantbomb.com/api/games/?api_key=8dd109cfd885e3367a3cde2b474e0c9a924e9534&format=json&field_list=name"
    response = urllib.request.urlopen(api_url)
    data = response.read()
    jsondata = json.loads(data)

    game_json = []

    for game in jsondata["results"]:
        game = {
            "name": game["name"],
        }

        game_json.append(game)
    print(game_json)
    return game_json

   

# '/users' is an endpoint with method
@app.route('/users', methods=["GET", "POST"])
def users():
    print("users endpoint reached..")
    if request.method == "GET":
        # r = reading
        with open("users.json", "r") as f:
            data = json.load(f)
            data.append({
                "username": "user4",
                "pets": ["hamster"]
            })

            # with a newly added user data set
            # have to send it as a valid response
            # we have to convert data agin using flask.jsonify()
            return flask.jsonify(data)
    if request.method == "POST":
        received_data = request.get_json()
        print(f"received data: {received_data}")
        message = received_data['data']
        return_data = {
            "status": "success",
            "message": f"recieved: {message}"
        }
        return flask.Response(response=json.dumps(return_data), status=201)

if __name__ == "__main__":
    app.run("localhost", 6969)