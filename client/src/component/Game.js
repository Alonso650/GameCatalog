import React from 'react';
// import './Game.css';

function Game({name, image, releaseDate}){
    return(
        <div className="game">
            <h1 id="gameTitle">{name}</h1>
            <img src={image} alt="gameImage"/>
            <h2 id="releaseDate">Release Date: {releaseDate}</h2>
        </div>
    );
}

export default Game;