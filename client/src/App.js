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

  const generateGameList = (gameData, numGames) => {
    const gameList = [];
    const usedIndices = new Set();

    while(gameList.length < numGames){
      const randIndex = Math.floor(Math.random() * gameData.length);
      if(!usedIndices.has(randIndex)){
        const game = gameData[randIndex];
        gameList.push(game);
        usedIndices.add(randIndex);
      }
    }

    return gameList;
  }


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
          <button onClick={() => {
            const newGameList = generateGameList(listOfGames, 20);
            setListOfGames(newGameList);
          }}>Generate Random List</button>
      </div>
      <div className="gameBody">
        {filteredGames.map((game) => {
          return(
            <Game 
              image={game.image.thumb_url}
              name={game.name}
              releaseDate = {game.original_release_date}
              onError={(e) => {
                e.target.onerror = null; // prevents infinite loop
                e.target.src = "default-image-url"; // fallback image url
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
