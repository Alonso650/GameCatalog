import React from 'react';
// import './Game.css';

function Game({name, background_image, releaseDate}){
    return(
        <div className="game">
            <h1 id="gameTitle">{name}</h1>
            <img src={background_image} alt="gameImage" onError={(e) => {
                e.target.onerror = null;
                e.target.src = "default-image-url";
            }}/>
            <h2 id="releaseDate">Release Date: {releaseDate}</h2>
        </div>
    );
}

export default Game;