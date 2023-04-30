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
      }
    );
  }, []);

  // Checks whether the game objects 'name' includes the searchWord string 
  // after its converted to lowercase and checks if the 'released property exists
  // and includes the searchWord as well
  const filteredGames = listOfGames ? listOfGames.filter((game) => {
    return (
        game.name.toLowerCase().includes(searchWord.toLowerCase()) ||
        (game.released && game.released.includes(searchWord.toLowerCase()))
    );
}) : [];



  // Calling a async function to await a response from the backend
  // to refresh the list of games randomly every time the button is clicked


  const generateGameList = async () => {
    const response = await axios.get("http://localhost:6969/")
    return response.data;
  }


  return (
    <div className="App">  
      <div className="gamelistHeader">
        <div>
          <h1 id="pageTitle">GameCatalog<span><ion-icon name="disc-outline"></ion-icon></span></h1>
        </div>
          <input type="text"
            placeholder="Enter a game..."
            id="searchBox"
            onChange={(event) => {
              setSearchWord(event.target.value);
            }}
          />
          <button onClick={async () => {
            const newGameList = await generateGameList();
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