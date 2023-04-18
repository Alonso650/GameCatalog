import './App.css';
import {useEffect, useState} from "react"
import axios from "axios";
import Game from "./component/Game";


const App = () =>{
  const [listOfGames, setListOfGames] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    axios.get("http://localhost:6969/").then(
      (response) => { 
        setListOfGames(response.data.results);
        console.log(response.data);
      }
    );
  }, []);

  const filteredGames = listOfGames.filter((game) => {
    return game.name.toLowerCase().includes(searchWord.toLowerCase());
  });
  /*
    Additions to the project:
      - add a button that will generate random games
      - add the option to save a game with a star/ similar to a like system
      - create option to make a personal profile
      - in personal profile can check saved games
      - add more functionality in the backend for the random generator 
      - 
  */

  return (
    <div className="App">  
      <div className="gamelistHeader">
        <div>
          <h1 id="pageTitle">GameCatalog<span><ion-icon name="disc-outline"></ion-icon></span></h1>
        </div>
          <input type="text"
            placeholder="Sonic..."
            id="searchBox"
            onChange={(event) => {
              setSearchWord(event.target.value);
            }}
          />
          <button>Generate Random List</button>
      </div>
      <div className="gameBody">
        {filteredGames.map((game) => {
          return(
            <Game 
              image={game.image.thumb_url}
              name={game.name}
              releaseDate = {game.original_release_date}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
