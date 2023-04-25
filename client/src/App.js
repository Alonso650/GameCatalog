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
        setListOfGames(response.data);
        console.log(response.data);
        //console.log(response.data.games);
        //console.log(response.text);
      }
    );
  }, []);

  // const filteredGames = listOfGames ? listOfGames.filter((game) => {
  //   return game.includes(searchWord.toLowerCase());
  // }) : [];

  const filteredGames = listOfGames ? listOfGames.filter((game) => {
    return (
        game.name.toLowerCase().includes(searchWord.toLowerCase()) ||
        (game.released && game.released.includes(searchWord.toLowerCase()))
    );
}) : [];

  // const generateGameList = (gameData = [], numGames = 0) => {
  //   const gameList = [];
  //   const usedIndices = new Set();

  //   while(gameList.length < numGames){
  //     const randIndex = Math.floor(Math.random() * gameData.length);
  //     if(!usedIndices.has(randIndex)){
  //       const game = gameData[randIndex];
  //       gameList.push(game);
  //       usedIndices.add(randIndex);
  //     }
  //   }

  //   return gameList;
  // }

  const generateGameList = (gameData = [], numGames = 0) => {
    const gameList = [];
    const usedIndices = new Set();
  
    while(gameList.length < numGames && gameList.length < gameData.length){
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
              key={game.id}
              name={game.name}
              background_image={game.background_image}
              releaseDate={game.released}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;