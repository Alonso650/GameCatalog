import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Game from "../component/Game"
import axios from "axios";



function Home(){
  
  const [listOfGames, setListOfGames] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [play, setPlay] = useState(false);

  let navigate = useNavigate();
  const mySound = require("../assets/sounds/elevator_music.mp3");
  const audio = document.getElementById("audio_tag");

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

  const generateRandomGames = async () => {
    const response = await axios.get("http://localhost:6969/");
    return response.data;
  }

  const replaceRandomGames = async () => {
    const newGameList = await generateRandomGames();
    setListOfGames(newGameList); 
  }



  // Calling a async function to await a response from the backend
  // to refresh the list of games randomly every time the button is clicked

  /*
    Add a footer!
  */

  // const generateGameList = async () => {
  //   const response = await axios.get("http://localhost:6969/")
  //   return response.data;
  // }


  return (
    <div className="App">  
      <div className="gamelistHeader">
        <div>
          <h1 id="pageTitle">GameCatalog<span><ion-icon name="disc-outline"></ion-icon></span></h1>
          {/* <button onClick={() => {
            play ? setPlay(false) : setPlay(true);
            play ? audio.pause() : audio.play();
          }}>
          </button> */}
          {/* <audio id="audio_tag" src={mySound}/> */}
        </div>
          {/* <input type="text"
            placeholder="Enter a game..."
            id="searchBox"
            onChange={(event) => {
              setSearchWord(event.target.value);
            }}
          /> */}
          {/* <button onClick={async () => {
            const newGameList = await generateGameList();
            setListOfGames(newGameList);
          }}>Generate Random List</button> */}
          <button onClick={replaceRandomGames}>Generate Random List</button>
      </div>     
      <div className="gameContainer">
        {filteredGames.map((game) => {
          return(
            <div 
                key={game.id}
                className="gameItem"
                onClick={() => {
                    navigate(`/game/${game.id}`);
                }}
            >
            <Game 
              key={game.id}
              name={game.name}
              background_image={game.background_image}
              releaseDate={game.released}
            
              />
            </div>
          );
        })}
      </div>
    </div>   
    );
}

export default Home;