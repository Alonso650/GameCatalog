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

  return (
    <div className="App">
      <div>
          <h1>GameList</h1>
        </div>
      <div className="gamelistHeader">
        
        <input type="text"
         placeholder="Sonic..."
         id="searchBox"
         onChange={(event) => {
           setSearchWord(event.target.value);
         }}
        />
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
